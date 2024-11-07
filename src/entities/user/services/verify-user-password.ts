import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import { passwordService } from "./password";

export async function verifyUserPassword({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const user = await userRepository.getUser({ login });

  if (!user) {
    return left("wron-login-or-password" as const);
  }

  const isCompare = await passwordService.comparePasswords({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isCompare) {
    return left("wron-login-or-password" as const);
  }

  return right(user);
}
