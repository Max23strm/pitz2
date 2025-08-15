import { Button, Modal, Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import styles from './styles.module.css'
import { Download } from "@mynaui/icons-react";
import { useForm } from '@mantine/form';
import dayjs from '@/helpers/dayjs'
import { useState } from 'react';

const DownloadModal = ({isOpened, handleModal, type}: {isOpened: boolean, handleModal: ()=>void, type :'ingreso' | 'gasto'}) => {

    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            startDate: dayjs().startOf('month'),
            endDate: dayjs().endOf('month'),
            format: 'Excel',
        },

        validate: {
            startDate: (value, values) => (dayjs(value).isBefore(values.endDate) ? null : 'La fecha inicial debe ser antes de la final'),
            endDate: (value, values) => (dayjs(value).isAfter(values.startDate) ? null : 'La fecha final debe ser despues de la inicial'),
        },
    });

    const handleSubmit = () => {
        setIsLoading(true)
        setIsLoading(false)
    }

    const avoidClosing = () => {
        if(!isLoading) {
            handleModal()
        }
    }

    return (
        <Modal opened={isOpened} onClose={avoidClosing} title={type === 'ingreso' ? "Descargar ingresos" : "Descargar gastos"} centered>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <div className={styles.download_modal_div}>
                    <DatePickerInput
                        withAsterisk
                        label={'Fecha inicial'}
                        key={form.key('startDate')}
                        {...form.getInputProps('startDate')}    
                    />
                    <DatePickerInput 
                        withAsterisk
                        label={'Fecha final'}
                        key={form.key('endDate')}
                        {...form.getInputProps('endDate')}    
                    />
                    <Select
                        disabled
                        label={'Formato'}
                        data={['Excel', 'PDF']}
                        key={form.key('format')}
                        {...form.getInputProps('format')}    
                    />
                </div>
                <div className={styles.download_modal_buttons}>
                    <Button variant='subtle' onClick={avoidClosing}>
                        Cerrar
                    </Button>
                    <Button
                        type='submit'
                        leftSection={<Download/>}
                        loading={isLoading}
                    >
                        Descargar
                    </Button>
                </div>

            </form>

        </Modal>
    )
}

export default DownloadModal