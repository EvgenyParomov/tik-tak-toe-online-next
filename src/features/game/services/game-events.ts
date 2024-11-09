import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";

type GameEvent = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};
type Listener = (game: GameEvent) => void;

class GameEventsService {
  listeners = new Map<GameId, Set<Listener>>();

  addListener(gameId: GameId, listener: Listener) {
    let listeners = this.listeners.get(gameId);

    if (!listeners) {
      listeners = new Set([listener]);
      this.listeners.set(gameId, listeners);
    }

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  emit(game: GameDomain.GameEntity) {
    console.log(this.listeners);
    console.log("emit");
    const listeners = this.listeners.get(game.id) ?? new Set();
    for (const listener of listeners) {
      listener({ type: "game-changed", data: game });
    }
  }
}

export const gameEvents = new GameEventsService();
