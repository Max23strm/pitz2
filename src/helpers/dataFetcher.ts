"use server"

import { generalEvent } from "@/interfaces/events";
import { EventsPageProps, PaymentsPageProps, PaymentsTypesPageProps, PlayerDetailPageProps, PlayersPageProps } from "@/interfaces/fetchers";
import { paymentsResponse, paymentTypesResponse } from "@/interfaces/payments";
import { playersDetailResponse, playersResponse } from "@/interfaces/players";

export const eventsGeneralFetch = async (): Promise<EventsPageProps> => {
    let events: generalEvent[] = [];
    const errors = { events: null as string | null };
    
    try {
        const events_response = await Promise.resolve(
            fetch(process.env.BASE_URL + '/api/' + "events"),
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
            fetch(process.env.BASE_URL + '/api/' + "players"),
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
        const events_response = await Promise.resolve(fetch(process.env.BASE_URL + '/api/' + "paymentsTypes"));

        paymentTypes = (await events_response.json()) as paymentTypesResponse[];
        
        return {
            paymentTypes,
            errors,
        };
    

    } catch (err) {
        console.log(err)
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
            fetch(process.env.BASE_URL + '/api/' + "payments?date=" + requestedDate, {cache:'no-store'}),
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

export const playersDetailFetch = async (requestedPlayer : string ): Promise<PlayerDetailPageProps> => {
    let player: playersDetailResponse | null = null;
    const errors = { player: null as string | null };
    console.log(process.env.BASE_URL + "/api/players/" + requestedPlayer)
    try {
        const player_response = await Promise.resolve(
            fetch(process.env.BASE_URL + "/api/players/" + requestedPlayer,),
        );
        player = (await player_response.json()) as playersDetailResponse;

        return {
            player,
            errors,
        };
    

    } catch (err) {
        errors.player = `${err}` ;
        return {
            player,
            errors,
        };
    }
};