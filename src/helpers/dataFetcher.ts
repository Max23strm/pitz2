import { generalEvent } from "@/interfaces/events";
import { EventsPageProps, PaymentsPageProps, PaymentsTypesPageProps, PlayersPageProps } from "@/interfaces/fetchers";
import { paymentsResponse, paymentTypesResponse } from "@/interfaces/payments";
import { playersResponse } from "@/interfaces/players";

export const eventsGeneralFetch = async (): Promise<EventsPageProps> => {
    let events: generalEvent[] = [];
    const errors = { events: null as string | null };
    
    try {
        const events_response = await Promise.resolve(
            fetch("http://localhost:3050/api/events"),
        );
        events = (await events_response.json()) as generalEvent[];
    } catch (err) {
        errors.events = `${err}`;
        return {
            events,
            errors,
        };
    }

    return {
        events,
        errors,
    };
};


export const playersGeneralFetch = async (): Promise<PlayersPageProps> => {
    let players: playersResponse[] = [];
    const errors = { players: null as string | null };

    try {
        const events_response = await Promise.resolve(
            fetch("http://localhost:3050/api/players"),
        );

        players = (await events_response.json()) as playersResponse[];
        
        return {
            players,
            errors,
        };
    

    } catch (err) {
        errors.players = `${err}` ;
        return {
            players,
            errors,
        };
    }
};

export const paymentTypesFetch = async (): Promise<PaymentsTypesPageProps> => {
    let paymentTypes: paymentTypesResponse[] = [];
    const errors = { paymentTypes: null as string | null };

    try {
        const events_response = await Promise.resolve(
            fetch("http://localhost:3050/api/paymentsTypes"),
        );

        paymentTypes = (await events_response.json()) as paymentTypesResponse[];
        
        return {
            paymentTypes,
            errors,
        };
    

    } catch (err) {
        errors.paymentTypes = `${err}` ;
        return {
            paymentTypes,
            errors,
        };
    }
};

export const paymentsGeneralFetch = async (requestedDate : string ): Promise<PaymentsPageProps> => {
    let payments: paymentsResponse[] = [];
    const errors = { payments: null as string | null };

    try {
        const events_response = await Promise.resolve(
            fetch("http://localhost:3050/api/payments?date=" + requestedDate, {cache:'no-store'}),
        );

        payments = (await events_response.json()) as paymentsResponse[];

        return {
            payments,
            errors,
        };
    

    } catch (err) {
        errors.payments = `${err}` ;
        return {
            payments,
            errors,
        };
    }
};