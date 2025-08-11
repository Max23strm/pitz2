import EventType from '@/app/components/InformationDisplay/EventType'
import { GoogleEvent } from '@/interfaces/events'
import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core'
import { ChevronRight } from '@mynaui/icons-react'
import dayjs from '@/helpers/dayjs'
import Link from 'next/link'
import styles from '../styles/events.module.css'

const EventsListCard = ({event }:{event: GoogleEvent}) => {

    const defineIfFullDay = (e : GoogleEvent) => {
        if(dayjs(e.start).get('hour') === 0 && dayjs(e.start).add(1,'day').isSame(dayjs(e.end))) {
            return {start: dayjs(event.start).format('DD/MMMM/YY'), end: null}
        } 

        return {
            start: dayjs(e.start).get('hour') === 0 ? dayjs(event.start).format('DD/MMMM/YY') : dayjs(event.start).format('DD/MMMM/YY hh:mm'),
            end: dayjs(e.end).get('hour') === 0 ? dayjs(event.end).format('DD/MMMM/YY') : dayjs(event.end).format('DD/MMMM/YY hh:mm')
        }
    }

    return (
        <Card shadow="xs" padding="lg" radius="md" withBorder key={event.google_id}>
            <Group justify="space-between" className={styles.card_body}>
                <Stack gap={1} className={styles.card_firt}>
                    <Group>
                        <Text>{event.summary}</Text>
                        <EventType event={event.summary}/>
                    </Group>
                    <Group gap={'xs'}>
                        <Text size="sm" c="dimmed">
                            {defineIfFullDay(event).start}
                        </Text> 
                        {
                            defineIfFullDay(event)?.end ? 
                            <>
                                <Text size="sm" c="dimmed">-</Text>
                                <Text size="sm" c="dimmed">{defineIfFullDay(event)?.end}</Text>
                            </> : null
                        
                        }
                    </Group>
                    {
                        event.location.length ?
                            <Group>
                                <Text size="xs" c="dimmed">{event.location}</Text>
                            </Group> :
                        null
                    }
                </Stack>
                <ActionIcon
                    variant="subtle" 
                    size='compact-sm'
                    component={Link}
                    target='_blank'
                    href={`${event.link}`}
                >
                    <ChevronRight />
                </ActionIcon >
            </Group>
        </Card>
    )
}

export default EventsListCard