import { Container } from '@mantine/core'
import PaymentsForm from './components/PaymentsForm';
import { paymentTypesFetch, playersGeneralFetch } from '@/helpers/dataFetcher';
import { PaymentsTypesPageProps, PlayersPageProps } from '@/interfaces/fetchers';
import ShowAlerts from './components/ShowAlerts';


type optionsForm = {
    playersResponse: PlayersPageProps,
    paymentsResponse: PaymentsTypesPageProps
}

const page = async () => {

    const formOptions : optionsForm= await Promise.allSettled([
        playersGeneralFetch(),
        paymentTypesFetch()
    ]).then(responses => {
        let playersResponse, paymentsResponse
        console.log(responses)
        if(responses[0].status=== 'rejected') {
            playersResponse = {
                players: [] ,
                isSuccess: false,
                errors: 'Error obteniendo jugadores'
            }
        } else {
            playersResponse = responses[0].value
        }
        if(responses[1].status=== 'rejected') {
            paymentsResponse = {
                paymentTypes: [] ,
                isSuccess: false,
                errors: 'Error obteniendo jugadores'
            }
        } else {
            paymentsResponse = responses[1].value

        }

        return { playersResponse, paymentsResponse }
    });

    return (
        <Container>
            <ShowAlerts formOptions={formOptions}/>
            <PaymentsForm formOptions={formOptions}/>
        </Container>
    )
}

export default page