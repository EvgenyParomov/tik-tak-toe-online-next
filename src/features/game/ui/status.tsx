import { GameDomain } from "@/entities/game";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">Ожидание игрока</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentSymbol(game);
      return <div className="text-lg">Ход: {currentSymbol}</div>;
    }
    case "gameOver":
      const currentSymbol = GameDomain.getPlayerSymbol(game.winner, game);
      return <div className="text-lg">Победитель: {currentSymbol}</div>;
    case "gameOverDraw":
      return <div className="text-lg">Ничья</div>;
  }
}
