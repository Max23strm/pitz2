import { Container, Group, Skeleton } from '@mantine/core'
import styles from './styles/payments.module.css'
import TableAndSelector from './components/TableAndSelector';

const page = async () => {

    return (
        <Container fluid className={styles.containerStyles}>
            <TableAndSelector/>
        </Container>
    )
}

export default page