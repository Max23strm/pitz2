
import styles from './styles/events.module.css'
import { Alert, Card, Container, Grid, GridCol } from '@mantine/core'
import { eventsGeneralFetch } from '@/helpers/dataFetcher';
import MainCalendar from './components/MainCalendar';
import { DangerOctagon } from "@mynaui/icons-react";
import EventsListCard from './components/EventsListCard';
import { generalEvent } from '@/interfaces/events';
const page = async () => {

    const { events, errors } = await eventsGeneralFetch();

    if(errors.events) {
        return <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
            {errors.events}
        </Alert>
    }

    if(!events?.length) {
        return <Alert variant="light" color="cyan" title="Sin datos para mostrar" withCloseButton={false} icon={<DangerOctagon/>}>
            Este mes no tiene eventos configurados
        </Alert>
    }

    return (
        <Container fluid >
            <Grid>
                <GridCol span={{base:12, md:7}} className={styles.card_column}>
                    {
                        events.map( (e : generalEvent) => ( <EventsListCard event={e} key={e.event_uid}/> ))
                    }
                </GridCol>
                <GridCol span={{base:12, md:5}}>
                    <Card shadow="xs" padding="lg" radius="md" withBorder>
                        <MainCalendar events={events}/>
                    </Card>
                </GridCol>
            </Grid>
        </Container>
    )
}

export default page