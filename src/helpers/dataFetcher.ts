import { generalEvent } from "@/interfaces/events";
import { EventsPageProps } from "@/interfaces/fetchers";

export const eventsGeneralFetch = async (): Promise<EventsPageProps> => {
    const events_response = await Promise.resolve(
        fetch("http://localhost:3050/api/events"),
    );
    let events: generalEvent[] = [];
    const errors = { events: null as string | null };

    try {
        events = (await events_response.json()) as generalEvent[];
    } catch (err) {
        errors.events = 'Failed to parse JSON for events ' + err ;
    }

    return {
        events,
        errors,
    };
};