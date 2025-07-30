import { formatCurrency } from '@/helpers/numberFormaters';
import { UpcomingEvent } from '@/interfaces/home'
import { Card, Group, Stack, Text } from '@mantine/core'
import { CalendarCheck, Dollar,  UsersGroup } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'

import Link from 'next/link'

interface AmountCardProps {
    type: 'amount';
    data: number;
}

interface PlayersCardProps {
    type: 'players';
    data: number;
}

interface EventCardProps {
    type: 'event';
    data: UpcomingEvent | null;
}

type Props = AmountCardProps | PlayersCardProps | EventCardProps;

const StandardCard = ({ type, data }: Props) => {
    if(type === 'event' && data === null) {
         <Card
                radius="lg" withBorder
                padding="xl"
                component={Link}
                href="/dashboard/organization/events"
            >
                <Text>Sin eventos programados</Text>
            </Card>
    }
    if(type === 'event' && data !== null ) {
        const { date, event_name, event_uid, type_name} : UpcomingEvent = data
        return (
            <Card
                radius="lg" withBorder
                padding="xl"
                component={Link}
                href={`/dashboard/organization/events/${event_uid}`}
            >
                <Group justify='space-between'>
                    <Stack >
                        <Text  fw={700} size="lg" >Próximo evento</Text>
                        <Stack gap={'xs'}>
                            <Text size="lg" c='indigo'>{event_name}</Text>
                            <Text c="dimmed" size='sm'>{dayjs(date).format('DD/MM/YYYY')}</Text>
                            <Text c="dimmed" size='sm'>{type_name}</Text>
                        </Stack>
                    </Stack>
                    <CalendarCheck size={'80px'} color='#0C5C7A'/>
                </Group>
            </Card>
        )

    }
    if(type === 'amount' ) {
        return (
            <Card
                radius="lg" withBorder
                padding="xl"
                component={Link}
                href={`/dashboard/administration/payments`}
            >
                <Group justify='space-between'>
                    <Stack >
                        <Text  fw={700} size="lg" >Recaudados este mes</Text>
                        <Stack gap={'sm'}>
                            <Text size="lg" >{formatCurrency(data)}</Text>
                        </Stack>
                    </Stack>
                    <Dollar size={'80px'} color='#0C5C7A'/>
                </Group>
            </Card>
        )

    }
    if(type === 'players' ) {
        return (
            <Card
                radius="lg" withBorder
                padding="xl"
                component={Link}
                href={`/dashboard/players`}
            >
                <Group justify='space-between'>
                    <Stack >
                        <Text  fw={700} size="lg" >Jugadores activos</Text>
                        <Stack gap={'sm'}>
                            <Text size="lg" >{data}</Text>
                        </Stack>
                    </Stack>
                    <UsersGroup size={'80px'} color='#0C5C7A'/>
                </Group>
            </Card>
        )

    }
}

export default StandardCard