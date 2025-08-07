import { formatCurrency } from '@/helpers/numberFormaters';
import { UpcomingEvent } from '@/interfaces/home'
import { Card, Group, Stack, Text } from '@mantine/core'
import { CalendarCheck, Dollar,  UsersGroup, ChevronDownLeft, ChevronUpRight } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import styles from './Card.module.css'
import Link from 'next/link'

interface AmountCardProps {
    type: 'amount';
    data: {
        income: number
        expense: number
    };
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
        return <Card
            radius="lg" withBorder
            padding="xl"
            component={Link}
            href="/dashboard/organization/events"
            className={styles.mainCard}
        >
            <Text>Sin eventos programados</Text>
            <CalendarCheck className={styles.heroIcon} size={'100px'} color='#0C5C7A'/>
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
                className={styles.mainCard}
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
                    <CalendarCheck className={styles.heroIcon} size={'100px'} color='#0C5C7A'/>
                </Group>
            </Card>
        )

    }
    if(type === 'amount' ) {
        const total = data.income - data.expense
        return (
            <Card
                radius="lg" withBorder
                padding="xl"
                className={styles.mainCard}
            >
                <Group justify='space-between'>
                    <Stack gap={'lg'}>
                        <Group>
                            <Stack gap={'xs'}>
                                <Text 
                                    component={Link}
                                    href={`/dashboard/administration/payments`}
                                    fw={600} size="md" 
                                >
                                        Recaudado
                                </Text>
                                <Group gap={'sm'}>
                                    <Text size="lg" >{formatCurrency(data.income)}</Text>
                                    <ChevronDownLeft color='green'/>
                                </Group>
                            </Stack>
                            <Stack gap={'xs'}>
                                <Text 
                                    component={Link}
                                    href={`/dashboard/administration/expenses`}
                                    fw={600} size="md" 
                                >
                                    Gastado
                                </Text>
                                <Group gap={'sm'}>
                                    <Text size="lg" >{formatCurrency(data.expense)}</Text>
                                    <ChevronUpRight color='red'/>
                                </Group>
                            </Stack>
                        </Group>
                        <Group>
                            <Text fw={600} size="md" >Diferencia</Text>
                            <Stack gap={'sm'}>
                                <Text size="lg" c={total > 0 ? 'green' : 'red'}>{formatCurrency(total)}</Text>
                            </Stack>
                        </Group>
                    </Stack>
                </Group>
                <Dollar className={styles.heroIcon} size={'100px'} color='#0C5C7A'/>
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
                className={styles.mainCard}
            >
                <Group justify='space-between'>
                    <Stack >
                        <Text fw={600} size="md" >Jugadores activos</Text>
                        <Stack gap={'sm'}>
                            <Text size="lg" >{data}</Text>
                        </Stack>
                    </Stack>
                    <UsersGroup className={styles.heroIcon} size={'100px'} color='#0C5C7A'/>
                </Group>
            </Card>
        )

    }
}

export default StandardCard