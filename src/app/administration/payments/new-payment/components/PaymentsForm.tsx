'use client'
import { Autocomplete, Button, Fieldset, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../styles/components.module.css'
import { playersResponse } from '@/interfaces/players'
import { paymentTypesResponse } from '@/interfaces/payments'
import { PaymentsTypesPageProps, PlayersPageProps } from '@/interfaces/fetchers'
import Link from 'next/link'

type optionsForm = {
    playersResponse: PlayersPageProps,
    paymentsResponse: PaymentsTypesPageProps
}


const PaymentsForm = ({formOptions} : {formOptions: optionsForm}) => {

    const {paymentsResponse, playersResponse} = formOptions


    return (
        <form className={styles.form}>
            <Fieldset className={styles.fieldSet}>
                <Autocomplete
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    label="Jugador"
                    data={playersResponse.players?.map((v : playersResponse ) => ({label:`${v.last_name}, ${v.firstName}`, value: v.player_uid}))}
                    placeholder="Selecciona un jugador"
                />

                <NumberInput
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    decimalScale={2}
                    thousandSeparator=","
                    label="Monto"
                    leftSection={<Dollar/>}
                    placeholder="Monto"
                />
                <TextInput
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    label="Referencia"
                    placeholder="Inserta referencia de depósito / pago"
                />
            </Fieldset>
            <Fieldset className={styles.fieldSet}>
                <DatePickerInput
                    radius={'md'}
                    withAsterisk
                    label="Fecha de ingreso"
                    placeholder="Selecciones la fecha de ingreso"
                    className={styles.fullWidthElement}
                />

                <Select
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    data={paymentsResponse.paymentTypes?.map( (v : paymentTypesResponse) => ({value: v.payment_type_uid, label:v.payment_name}))}
                    label="Tipo de pago"
                    placeholder="Selecciona el tipo de pago"
                >

                </Select>
            </Fieldset>

            <Textarea
                className={styles.fullWidthElement}
                radius={'md'}
                label='Comentario'
                placeholder='Ingresa algun comentario'
            />

            <Group justify='space-between' className={styles.fullWidthElement}>
                <Button 
                    component={Link}
                    href={'/administration/payments'}
                    variant='subtle'
                >
                    Regresar
                </Button>
                <Button 
                    disabled
                    variant='gradient'
                >
                    Enviar
                </Button>
            </Group>
            
        </form>
    )
}

export default PaymentsForm