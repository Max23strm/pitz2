import { Container } from '@mantine/core'
import React from 'react'
import ExpensesForm from './components/ExpensesForm'
import { usersGeneralFetch } from '@/helpers/dataFetcher';
import { UsersGeneralResponse } from '@/interfaces/fetchers';
import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert';




const page = async () => {
    const usersResponse : UsersGeneralResponse= await usersGeneralFetch()
       
    return (
        <Container fluid>
           { !usersResponse?.isSuccess  && <ErrorAlert errorMessage={'Error obteniendo información'}/>}
            <ExpensesForm usersResponse={usersResponse}/>
        </Container>
    )
}

export default page