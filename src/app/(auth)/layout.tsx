import { ReactNode } from 'react'
import styles from './styles/Layout.module.css'
import { Paper } from '@mantine/core'

const layout = ({children} : { children: ReactNode }) => {
    return (
        <div className={styles.login_container}>
            <Paper className={styles.form_section} radius={'xl'}>
                {children}
            </Paper>
            <div className={styles.wrapper}>
            </div>
        </div>
    )
}

export default layout