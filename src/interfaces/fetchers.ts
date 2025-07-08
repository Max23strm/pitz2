export interface EventsPageProps {
  events: generalEvent[] | null;
  errors: {
    events: string | null;
  };
}