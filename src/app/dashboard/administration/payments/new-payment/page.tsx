import { Container } from '@mantine/core'
import PaymentsForm from './components/PaymentsForm';
import { paymentTypesFetch, playersGeneralFetch } from '@/helpers/dataFetcher';
import { PaymentsTypesPageProps, PlayersPageProps } from '@/interfaces/fetchers';
import ShowAlerts from './components/ShowAlerts';


// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;


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