import EventType from '@/app/components/InformationDisplay/EventType'
import { generalEvent } from '@/interfaces/events'
import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core'
import { ChevronRight } from '@mynaui/icons-react'
import dayjs from '@/helpers/dayjs'
import Link from 'next/link'

const EventsListCard = ({event }:{event: generalEvent}) => {
    return (
        <Card shadow="xs" padding="lg" radius="md" withBorder key={event.event_uid}>
            <Group justify="space-between">
                <Stack gap={1}>
                    <Group>
                        <Text>{event.event_name}</Text>
                        <EventType event={event.type_name}/>
                    </Group>
                    <Text size="xs" c="dimmed">{dayjs(event.date).format('DD/MMMM/YY')}</Text>
                </Stack>
                <ActionIcon
                    variant="subtle" 
                    size='compact-sm'
                    component={Link}
                    href={`/dashboard/events/${event.event_uid}`}
                >
                    <ChevronRight />
                </ActionIcon >
            </Group>
        </Card>
    )
}

export default EventsListCard