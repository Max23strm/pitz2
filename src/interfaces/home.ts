export interface HomeResponse {
    data: HomeData | null;
    isSuccess: boolean,
    errors: {
        home: string | null;
    };
}
export interface Fetch {
    data:      HomeData;
    estado:    string;
    isSuccess: boolean;
}

export interface HomeData {
    monthly_income: number;
    monthly_expense: number;
    players_amount: number;
    upcoming_event: UpcomingEvent | null;
}

export interface UpcomingEvent {
    event_uid:  string;
    event_name: string;
    date:       Date;
    type_name:  string;
}
