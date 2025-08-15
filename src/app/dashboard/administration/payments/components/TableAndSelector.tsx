'use client'
import { paymentsGeneralFetch } from '@/helpers/dataFetcher'
import { Button, Group, Stack } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import PaymentsTable from './PaymentTable'
import { paymentsResponse } from '@/interfaces/payments'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import Link from 'next/link'
import { FilePlus,  } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import DownloadModal from '@/app/components/adminComponents/DownloadModal'

const TableAndSelector = () => {

    const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchedPayments, setfetchedPayments] = useState<{response:paymentsResponse[], error: string | null}>({response:[], error:null})
    const [loading, setLoading] = useState(true)
    const makeCAll = useCallback( async ()=>{
        setLoading(true)
        const { payments, errors } = await paymentsGeneralFetch(value);

        if(errors.payments){
            setfetchedPayments({response:[], error: errors.payments})
        } else {
            setfetchedPayments({response:payments ?? [], error:null})
        }
        setLoading(false)
    },[value])

    useEffect(()=>{
        makeCAll()
    },[makeCAll])

    const handleDateChange = (value : string | null) => {
        if( value === null) setValue(dayjs(value).format('YYYY-MM-DD'))
        else setValue(value)
    }

    const handleModal = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <>  
            <DownloadModal isOpened={isModalOpen} handleModal={handleModal} type='ingreso'/>
            <Group justify='space-between' align='end'>
                <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
                    <MonthPickerInput
                        label="Mes"
                        placeholder="Mes"
                        value={value}
                        onChange={handleDateChange}
                    />
                </DatesProvider>
                <Group>
                    {/* <Button
                        size='sm'
                        leftSection={<Download/>}
                        variant='light'
                        onClick={handleModal}
                    >
                        Descargar
                    </Button> */}
                    <Button
                        component={Link}
                        href={'/dashboard/administration/payments/new-payment'}
                        size='sm'
                        leftSection={<FilePlus/>}
                    >
                        Nuevo
                    </Button>
                </Group>
            </Group>
            <Stack
                bg="var(--mantine-color-body)"
                align="start"
                justify="center"
                gap="md"
            >

                <ErrorAlert errorMessage={fetchedPayments.error}/>
                <PaymentsTable payments={fetchedPayments.response} loading={loading}/>

            </Stack>
        </>
    )
}

export default TableAndSelector