import { Grid, GridCol, Skeleton } from '@mantine/core'

const LoadingComponents = () => {
    return (
        <Grid gap={{base: 12}}>
            <GridCol span={{ base: 12, md:5, lg:3 }}>
                <Skeleton width={'100%'} height={'100%'}/>
            </GridCol>
            <GridCol span={{ base: 12, md:7, lg:9 }}>
                <Skeleton width={'100%'} height={500}/>
            </GridCol>
        </Grid>
    )
}

export default LoadingComponents