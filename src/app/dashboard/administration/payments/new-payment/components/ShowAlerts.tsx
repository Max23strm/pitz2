import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import { PaymentsTypesPageProps, PlayersPageProps } from '@/interfaces/fetchers'
import { Group } from '@mantine/core'
import React from 'react'

type optionsForm = {
    playersResponse: PlayersPageProps,
    paymentsResponse: PaymentsTypesPageProps
}


const ShowAlerts = ({formOptions} : {formOptions: optionsForm}) => {
    const {paymentsResponse, playersResponse} = formOptions

    return (
        <Group mb={'1rem'}>
            {paymentsResponse?.errors && <ErrorAlert errorMessage={'Error obteniendo tipos de pago'}/>}
            {playersResponse?.errors && <ErrorAlert errorMessage={'Error obteniendo jugadores'}/>}
        </Group>
    )
}

export default ShowAlerts