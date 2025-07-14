import { Container, Group, Skeleton } from '@mantine/core'
import React from 'react'

const Loading = () => {
    return (
        <Container>
            <Group justify='space-between'>
                <Skeleton height={32} width={100} radius="xl" />
                <Skeleton height={32} width={100} radius="xl" />
            </Group>
            <Skeleton height={250} radius="lg" mt={16} />
        </Container>
      )
}

export default Loading