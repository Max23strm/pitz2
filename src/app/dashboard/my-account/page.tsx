import { Avatar, Container, Grid, GridCol, TextInput } from '@mantine/core'
import React from 'react'
import styles from './styles/my-account.module.css'
import PasswordSetter from './components/PasswordSetter'
import { getUser } from '@/helpers/dataFetcher'
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'

const page = async () => {

    const userData= await getUser()

    if(!userData.isSuccess) {
        return <ErrorAlert errorMessage={'Intente nuevamente'}/>
    }

    if(userData?.data) {
        return (
            <Container fluid >
                <Grid>
                    <GridCol span={{base: 12, md: 4}}>
                        <Avatar className={styles.image}/>
                    </GridCol>
                    <GridCol span={{base: 12, md: 8}}>
                        <Grid>
                            <GridCol span={{base: 12, md: 6}}>
                                <TextInput
                                    label="Usuario"
                                    size="md"
                                    radius="md"
                                    value={userData.data.username}
                                    disabled
                                />
                            </GridCol>
                            <GridCol span={{base: 12, md: 6}}>
                                <TextInput
                                    label="Email"
                                    size="md"
                                    radius="md"
                                    value={userData.data.email}
                                    disabled
                                />
                            </GridCol>
                            <GridCol span={{base: 12, md: 6}}>
                                <TextInput
                                    label="Nombres"
                                    size="md"
                                    radius="md"
                                    value={userData.data.first_name}
                                    disabled
                                />
                            </GridCol>
                            <GridCol span={{base: 12, md: 6}}>
                                <TextInput
                                    label="Apellidos"
                                    size="md"
                                    radius="md"
                                    value={userData.data.last_name}
                                    disabled
                                />
                            </GridCol>
                        </Grid>
                    </GridCol>
                    <PasswordSetter/>
                </Grid>
            </Container >
        )
        
    }

}

export default page