import { getIdleGames } from "@/entities/game/server";
import { GamesListClient } from "./games-list-client";

export async function GamesList() {
  const games = await getIdleGames();

  return <GamesListClient games={games} />;
}
