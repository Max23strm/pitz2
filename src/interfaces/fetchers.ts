import { generalEvent } from "./events";
import { ExpenseDetail } from "./expenses";
import { PaymentDetails, paymentsResponse, paymentTypesResponse } from "./payments";
import { playersData, playersDetailResponse} from "./players";

export interface EventsPageProps {
  events: generalEvent[] | null;
  errors: {
    events: string | null;
  };
}

export interface EventsPageProps {
  events: generalEvent[] | null;
  errors: {
    events: string | null;
  };
}

export interface PlayersPageProps {
  players: playersData[] | null;
  isSuccess: boolean,
  errors?: string | null,
}
export interface PaymentsPageProps {
  payments: paymentsResponse[] | null;
  errors: {
    payments: string | null;
  };
}

export interface PlayerDetailPageProps {
  player: playersDetailResponse | null;
  errors: {
    player: string | null;
  };
}
export interface PaymentDetailResponse {
  payment: PaymentDetails | null;
  isSucces: boolean,
  errors: string | null;
}
export interface ExpenseDetailResponse {
  expense: ExpenseDetail | null;
  isSucces: boolean,
  errors: string | null;
}

export interface PaymentIdResponse {
  payment_uid: string | null;
  isSucces: boolean,
  errors: string | null;
}

export interface PaymentsTypesPageProps {
  paymentTypes: paymentTypesResponse[] | null;
  isSuccess: boolean
  errors: string | null;
}

export interface SimpleUserResponse {
  isSuccess: boolean;
  error?: string;
  data?:SimpleUserData | null
}

export interface SimpleUserData {
  email:string;
  username: string;
  user_uid: string;
}

export interface UserResponse {
  isSuccess: boolean;
  error?: string;
  data?:CompleteUserData | null
}

export interface CompleteUserData {
  user_uid:   string;
  email:      string;
  username:   string;
  first_name: string;
  last_name:  string;
}

export interface UsersGeneralResponse {
  data:      userGeneral[];
  estado?:    string;
  mensaje?:    string | null;
  isSuccess: boolean;
}

export interface userGeneral {
  user_uid:   string;
  username:   string;
  first_name: string;
  last_name:  string;
}