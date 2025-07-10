import { generalEvent } from "./events";
import { paymentsResponse, paymentTypesResponse } from "./payments";
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
export interface PaymentsPageProps {
  payments: paymentsResponse[] | null;
  errors: {
    payments: string | null;
  };
}

export interface PaymentsTypesPageProps {
  paymentTypes: paymentTypesResponse[] | null;
  errors: {
    paymentTypes: string | null;
  };
}