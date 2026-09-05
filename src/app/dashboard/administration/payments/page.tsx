import { Container } from '@mantine/core'
import styles from './styles/payments.module.css'
import TableAndSelector from './components/TableAndSelector';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = async () => {

    return (
        <Container fluid className={styles.containerStyles}>
            <TableAndSelector/>
        </Container>
    )
}

export default page