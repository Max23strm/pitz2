'use client'
import { GoogleEvent, GoogleEventsResponse } from '@/interfaces/events';
import { Alert, Card, Container, Grid, GridCol, Skeleton, Stack } from '@mantine/core';
import MainCalendar from './MainCalendar';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import EventsListCard from './EventsListCard';
import styles from '../styles/events.module.css'
import { DangerOctagon } from '@mynaui/icons-react';
import { eventsGeneralFetch } from '@/helpers/dataFetcherClient';
import { useMediaQuery } from '@mantine/hooks';

const MainComponent = () => {
    const matches = useMediaQuery("(min-width: 1050px)");

    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
    const [dateResponse, setDateResponse] = useState<GoogleEventsResponse | null>(null)
    const [isLoading, setisLoading] = useState(true)
    const changeDate = (newDate: string) => {
        setDate(dayjs(newDate).format("YYYY-MM-DD"))
    }

    const handleFetch = useCallback( async ()=>{
        setisLoading(true)
        const response = await eventsGeneralFetch(date); 
        setDateResponse(response)
        setisLoading(false)
    },[date])

    useEffect(()=>{
        handleFetch()
    },[handleFetch])

    if(dateResponse !== null) {
        const {isSuccess, events, errors, mensaje} = dateResponse
        if(!isSuccess) {
            return <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
                {errors?.length ? errors : mensaje}
            </Alert>
        }
    
        return (
            <Container fluid >
                <Grid>
                    { 
                        !matches &&
                            <GridCol span={{base:12}}>
                                <Card shadow="xs" padding="lg" radius="md" withBorder className={styles.calendar_card}>
                                    <MainCalendar 
                                        events={events}
                                        monthChange= {changeDate}
                                    />
                                </Card>
                            </GridCol>
                    }
                    <GridCol span={{base:12, md:7}} className={styles.card_column}>
                        {
                            isLoading ?
                                <Stack>
                                    <Skeleton height={90} radius="lg" />
                                    <Skeleton height={90} radius="lg" />
                                    <Skeleton height={90} radius="lg" />
                                    <Skeleton height={90} radius="lg" />
                                    <Skeleton height={90} radius="lg" />
                                </Stack>:
                                events === null || !events?.length ?
                                    <Alert variant="light" color="cyan" title="Sin datos para mostrar" withCloseButton={false} icon={<DangerOctagon/>}>
                                        Este mes no tiene eventos configurados
                                    </Alert>:
                                    events.map( (e : GoogleEvent) => ( <EventsListCard event={e} key={e.google_id}/> ))
                        }
                    </GridCol>
                    { 
                        matches &&
                            <GridCol span={{base:5}}>
                                <Card shadow="xs" padding="lg" radius="md" withBorder className={styles.calendar_card}>
                                    <MainCalendar 
                                        events={events}
                                        monthChange= {changeDate}
                                    />
                                </Card>
                            </GridCol>
                    }
                </Grid>
            </Container>
        )
    }

}

export default MainComponent