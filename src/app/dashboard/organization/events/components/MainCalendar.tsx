'use client'

import dayjs from '@/helpers/dayjs'
import { Indicator } from '@mantine/core';
import { Calendar, DatesProvider } from '@mantine/dates';
import { GoogleEvent } from '@/interfaces/events';

const MainCalendar = ({ events, monthChange }: {events:GoogleEvent[], monthChange: (newDate: string)=> void}) => {

    return (
        <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
            <Calendar
                hideOutsideDates={true}
                onMonthSelect={(date)=>{monthChange(date)}}
                onNextMonth={(date)=>{monthChange(date)}}
                onPreviousMonth={(date)=>{monthChange(date)}}
                renderDay={(date) => {
                    const day = dayjs(date).date();
                    const indicate = events?.find(e => dayjs(e.start).format('DDMMYYYY') === dayjs(date).format('DDMMYYYY') )
                    return (
                        <Indicator 
                            size={7} 
                            color="accent-pitz" 
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