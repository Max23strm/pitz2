import { Button, Modal, Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import styles from './styles.module.css'
import { Download } from "@mynaui/icons-react";
import { useForm } from '@mantine/form';
import dayjs from '@/helpers/dayjs'
import { useState } from 'react';
import { postPaymentsResponse } from '@/helpers/dataPosterClient';
import { notifications } from '@mantine/notifications';

const DownloadModal = ({isOpened, handleModal, type}: {isOpened: boolean, handleModal: ()=>void, type :'ingreso' | 'gasto'}) => {

    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            start_date: dayjs().startOf('month').format(),
            end_date: dayjs().endOf('month').format(),
            file_type: 'Excel',
        },
        validate: {
            start_date: (value, values) => (dayjs(value).isBefore(values.end_date) ? null : 'La fecha inicial debe ser antes de la final'),
            end_date: (value, values) => (dayjs(value).isAfter(values.start_date) ? null : 'La fecha final debe ser despues de la inicial'),
        },
        transformValues: (values) => ({
            start_date: dayjs(values.start_date).format(),
            end_date: dayjs(values.end_date).format(),
            file_type: values.file_type.toLowerCase(),
        }),
    });
    
    type FormValues = typeof form.values;
    
    const handleSubmit = async (data : FormValues) => {
        setIsLoading(true)
        const response = await postPaymentsResponse(data)
        if(response?.isSuccess === false) {
            notifications.show({
                title: 'Error obteniendo reporte',
                message: 'Intente nuevamente',
                color: 'red'
            })
        }
        
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
                        key={form.key('start_date')}
                        {...form.getInputProps('start_date')}    
                    />
                    <DatePickerInput 
                        withAsterisk
                        label={'Fecha final'}
                        key={form.key('end_date')}
                        {...form.getInputProps('end_date')}    
                    />
                    <Select
                        disabled
                        label={'Tipo de archivo'}
                        data={['Excel', 'PDF']}
                        key={form.key('file_type')}
                        {...form.getInputProps('file_type')}    
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