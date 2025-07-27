import { Alert } from '@mantine/core'
import { DangerOctagon } from '@mynaui/icons-react'

const ErrorAlert = ({errorMessage} : {errorMessage: string | null}) => {
    if(!Boolean(errorMessage)) return

    return (
        <Alert variant="light" radius="lg" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
            {errorMessage}
        </Alert>
    )
}

export default ErrorAlert