import { generalEvent } from "./events";
import { playersResponse } from "./players";

export interface EventsPageProps {
  events: generalEvent[] | null;
  errors: {
    events: string | null;
  };
}

export interface PlayersPageProps {
  players: playersResponse[] | null;
  errors: {
    players: string | null;
  };
}