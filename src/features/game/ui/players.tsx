import { GameDomain } from "@/entities/game";

export function GamePlayers({ game }: { game: GameDomain.GameEntity }) {
  const firtsPlayer = game.status === "idle" ? game.creator : game.players[0];

  const secondPlayer = game.status === "idle" ? undefined : game.players[1];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">
        X - {firtsPlayer.login}:{firtsPlayer.rating}
      </div>
      <div className="text-lg">
        O - {secondPlayer?.login ?? "..."}:{secondPlayer?.rating ?? "..."}
      </div>
    </div>
  );
}
