"use server";

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";
import { gameEvents } from "../services/game-events";

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

  const result = await stepGame(gameId, currentUser, index);

  if (result.type === "right") {
    gameEvents.emit(result.value);

    return result;
  }

  return result;
};
