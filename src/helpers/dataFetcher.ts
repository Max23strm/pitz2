import { generalEvent } from "@/interfaces/events";
import { EventsPageProps, PlayersPageProps } from "@/interfaces/fetchers";
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