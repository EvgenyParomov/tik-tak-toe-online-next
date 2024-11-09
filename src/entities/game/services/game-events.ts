import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChanel } from "@/shared/lib/events";

type GameChanged = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};
type GameCreated = {
  type: "game-created";
};
type GameEvent = GameChanged | GameCreated;

class GameEventsService {
  eventsChanel = new EventsChanel("game");
  async addGameChangedListener(
    gameId: GameId,
    listener: (event: GameChanged) => void,
  ) {
    return this.eventsChanel.concume(gameId, (data) => {
      listener(data as GameChanged);
    });
  }
  async addGameCreatedListener(listener: (event: GameCreated) => void) {
    return this.eventsChanel.concume(`game-created`, (data) => {
      listener(data as GameCreated);
    });
  }

  emit(event: GameEvent) {
    if (event.type === "game-changed") {
      return this.eventsChanel.emit(event.data.id, event);
    }

    if (event.type === "game-created") {
      return this.eventsChanel.emit("game-created", event);
    }
  }
}

export const gameEvents = new GameEventsService();
