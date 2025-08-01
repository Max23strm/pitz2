import { Container, Grid, GridCol, Skeleton } from '@mantine/core'
import React from 'react'

const loading = () => {
    return (
        <Container fluid>
            <Grid>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol span={{base:12, md: 4}}>
                    <Skeleton height={'36px'} />
                </GridCol>
                <GridCol>
                    <Skeleton height={'36px'} width={'50px'} />
                </GridCol>
            </Grid>
        </Container>
    )
}

export default loading