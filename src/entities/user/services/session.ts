import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionEntity, UserEntity, userToSession } from "../domain";
import { left, right } from "@/shared/lib/either";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return right(payload as SessionEntity);
  } catch (error) {
    return left(error);
  }
}

async function addSession(user: UserEntity) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionData = userToSession(user, expiresAt.toISOString());
  const session = await encrypt(sessionData);
  const cookiesStore = await cookies();

  cookiesStore.set("session", session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

const getSessionCookies = () => cookies().then((c) => c.get("session")?.value);
const verifySession = async (getCookies = getSessionCookies) => {
  const cookie = await getCookies();
  const session = await decrypt(cookie);

  if (session.type === "left") {
    redirect("/sign-in");
  }

  return { isAuth: true, session: session.value };
};

export const sessionService = { addSession, deleteSession, verifySession };
