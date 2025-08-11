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
    start:       { dateTime: string, timeZone: string, date: string };
    end:       { dateTime: string, timeZone: string, date: string };
    created:  string;
    event_type:  string;
    html_link:  string;
    kind:  string;
    location:  string;
    status:  string;
    summary:  string;
}
