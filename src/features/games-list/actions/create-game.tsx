"use server";

import { createGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  if (gameResult.type === "right") {
    redirect(routes.game(gameResult.value.id));
  }

  return gameResult;
};
