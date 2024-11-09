import { userRepository } from "../repositories/user";
import { sessionService } from "./session";

export const getCurrentUser = async (
  getCookies?: () => Promise<string | undefined>,
) => {
  const { session } = await sessionService.verifySession(getCookies);
  return userRepository.getUser({ id: session.id });
};
