'use client'
import { paymentsGeneralFetch } from '@/helpers/dataFetcher'
import { Button, Group, Stack } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import PaymentsTable from './PaymentTable'
import { paymentsResponse } from '@/interfaces/payments'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import Link from 'next/link'
import { FilePlus } from "@mynaui/icons-react";

const TableAndSelector = () => {

    const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'))
    const [fetchedPayments, setfetchedPayments] = useState<{response:paymentsResponse[], error: string | null}>({response:[], error:null})

    const makeCAll = useCallback( async ()=>{
        const { payments, errors } = await paymentsGeneralFetch(value);

        if(errors.payments){
            setfetchedPayments({response:[], error: errors.payments})
        } else {
            setfetchedPayments({response:payments ?? [], error:null})
        }

    },[value])

    useEffect(()=>{
        makeCAll()
    },[makeCAll])

    const handleDateChange = (value : string | null) => {
        if( value === null) setValue(dayjs(value).format('YYYY-MM-DD'))
        else setValue(value)
    }

    return (
        <>
            <Group justify='space-between' align='end'>
                <MonthPickerInput
                    label="Mes"
                    placeholder="Mes"
                    value={value}
                    onChange={handleDateChange}
                />
                <Button
                    component={Link}
                    href={'payments/new-payment'}
                    size='sm'
                    leftSection={<FilePlus/>}
                >
                    Nuevo
                </Button>
            </Group>
            <Stack
                bg="var(--mantine-color-body)"
                align="start"
                justify="center"
                gap="md"
            >

                <ErrorAlert errorMessage={fetchedPayments.error}/>
                <PaymentsTable payments={fetchedPayments.response}/>

            </Stack>
        </>
    )
}

export default TableAndSelector