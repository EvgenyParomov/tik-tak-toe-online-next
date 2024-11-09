"use client";

import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";
import { Button } from "@/shared/ui/button";
import { routes } from "@/kernel/routes";
import Link from "next/link";
import { GameDomain } from "@/entities/game";
import { useEventsSource } from "@/shared/lib/sse/client";

export function GamesListClient({
  games,
}: {
  games: GameDomain.GameIdleEntity[];
}) {
  const { dataStream: gamesStream = games } = useEventsSource<
    GameDomain.GameIdleEntity[]
  >(routes.gamesStream());

  return (
    <Layout actions={<CreateButton />}>
      {gamesStream.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>Подключиться</Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}
