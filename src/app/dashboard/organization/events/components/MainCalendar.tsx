'use client'

import dayjs from '@/helpers/dayjs'
import { Indicator } from '@mantine/core';
import { Calendar, DatesProvider } from '@mantine/dates';
import { generalEvent } from '@/interfaces/events';

const MainCalendar = ({ events }: {events:generalEvent[]}) => {


    return (
        <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
            <Calendar
                hideOutsideDates={true}
                onMonthSelect={(date)=>{console.log(date)}}
                onNextMonth={(date)=>{console.log(date)}}
                onPreviousMonth={(date)=>{console.log(date)}}
                renderDay={(date) => {
                    const day = dayjs(date).date();
                    const indicate = events.find(e => dayjs(e.date).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY') )
                    return (
                        <Indicator 
                            size={6} 
                            color="red" 
                            offset={-2} 
                            disabled={!Boolean(indicate)}
                        >
                            <div>{day}</div>
                        </Indicator>
                    );
                }}
                    static
            />
        </DatesProvider>
    )
}

export default MainCalendar