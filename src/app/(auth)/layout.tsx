import { ReactNode } from 'react'
import styles from './styles/Layout.module.css'
import { Paper } from '@mantine/core'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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