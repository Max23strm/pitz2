import { Container, Grid, GridCol, Skeleton } from '@mantine/core'
import React from 'react'

const Loading = () => {
    return (
        <Container fluid>
    <Grid>
      <GridCol span={{ base: 12}}>
        <Skeleton height={200} radius="xl" />
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
        <Skeleton height={162} radius="xl" />
      </GridCol>
      <GridCol span={{ base: 12, md: 6}}>
        <Skeleton height={162} radius="xl" />
      </GridCol>
    </Grid>
    
   
  </Container>
    )
}

export default Loading