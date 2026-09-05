import { Container } from '@mantine/core'
import React from 'react'
import TableAndSelector from './components/TableAndSelector'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const page = () => {
    return (
        <Container fluid>
            <TableAndSelector/>
        </Container>
    )
}

export default page