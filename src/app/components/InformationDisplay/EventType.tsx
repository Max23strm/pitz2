import { eventTypeName } from '@/interfaces/events'
import { Badge } from '@mantine/core'
import React from 'react'

interface eventTypeProps {
    event: eventTypeName | string
}


const defineColor = (event_name :  eventTypeName | string) : string => {

    switch(event_name){
        case 'Entrenamiento':
            return 'cyan'
        case 'Torneo 15s':
            return 'indigo'
        case 'Torneo 7s':
            return 'orange'
        case 'Torneo 10s':
            return 'lime'
        default:
            return 'gray'
    }
}


const EventType = ({ event }: eventTypeProps) => {
    
    return (
        <Badge size='xs' color={ defineColor(event)} >
            {event}
        </Badge>
    )
}

export default EventType