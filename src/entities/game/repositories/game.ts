import { prisma } from "@/shared/lib/db";
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "../domain";
import { Game, GamePlayer, Prisma, User } from "@prisma/client";
import { z } from "zod";
import { GameId } from "@/kernel/ids";

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: gameInclude,
  });

  games.map((game) => game.players.map((p) => p.user));

  return games.map(dbGameToGameEntity);
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          create: {
            userId: player.id,
            index: 1,
          },
        },
        status: "inProgress",
      },
      include: gameInclude,
    }),
  );
}

async function saveGame(
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) {
  const winnerId =
    game.status === "gameOver"
      ? await prisma.gamePlayer
          .findFirstOrThrow({
            where: { userId: game.winner.id },
          })
          .then((p) => p.id)
      : undefined;

  return dbGameToGameEntity(
    await prisma.game.update({
      where: { id: game.id },
      data: {
        status: game.status,
        field: game.field,
        winnerId: winnerId,
      },
      include: gameInclude,
    }),
  );
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }
  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
        },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  console.log({ game }, 2);
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayerToPlayer);

  console.log({ game }, 3);

  switch (game.status) {
    case "idle": {
      const [creator] = players;
      if (!creator) {
        throw new Error("creator shoud be in game idle");
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner shoud be in game over");
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const dbPlayerToPlayer = (
  db: GamePlayer & { user: User },
): PlayerEntity => {
  return {
    id: db.user.id,
    login: db.user.login,
    rating: db.user.rating,
  };
};

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
  saveGame,
};
