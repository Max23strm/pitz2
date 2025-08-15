'use client'
import { Button, Group, Stack } from '@mantine/core'
import { DatesProvider, MonthPickerInput } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import Link from 'next/link'
import { FilePlus } from "@mynaui/icons-react";
import dayjs from '@/helpers/dayjs'
import ExpensesTable from './ExpensesTable'
import { expensesGeneralFetch } from '@/helpers/dataFetcher'
import { SimpleExpense } from '@/interfaces/expenses'
import DownloadModal from '@/app/components/adminComponents/DownloadModal'

const TableAndSelector = () => {

    const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [fetchedPayments, setfetchedPayments] = useState<{response:SimpleExpense[], error: string | null}>({response:[], error:null})
    const [isLoading, setisLoading] = useState(true)
    const makeCAll = useCallback( async ()=>{
        setisLoading(true)
        const { data, isSuccess, mensaje } = await expensesGeneralFetch(value);
        if(!isSuccess){
            setfetchedPayments({response:[], error: mensaje ?? ''})
        } else {
            setfetchedPayments({response:data ?? [], error:null})
        }
        setisLoading(false)
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
            <DownloadModal isOpened={isModalOpen} handleModal={handleModal} type='gasto'/>
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
                        href={'/dashboard/administration/expenses/new-expense'}
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

                <ErrorAlert errorMessage={fetchedPayments?.error}/>
                <ExpensesTable expenses={fetchedPayments.response} loading={isLoading}/>

            </Stack>
        </>
    )
}

export default TableAndSelector