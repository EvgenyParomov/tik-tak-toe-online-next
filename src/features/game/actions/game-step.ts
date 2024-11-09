"use server";

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";
export const gameStepAction = async ({
  index,
  gameId,
}: {
  gameId: GameId;
  index: number;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("not-found");
  }

  return await stepGame(gameId, currentUser, index);
};
