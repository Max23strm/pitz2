import ErrorAlert from '@/app/components/InformationDisplay/ErrorAlert'
import { playersDetailFetch } from '@/helpers/dataFetcher'
import { Container } from '@mantine/core'
import React from 'react'
import PlayerForm from '../components/PlayerForm'
import { postPlayerForm } from '@/helpers/dataPoster'

const page = async ({params}:{params: Promise<{ player_uid: string }>}) => {
  const playerParam = await params
  
  const {errors, player} = await playersDetailFetch(playerParam.player_uid)
  
  if(errors.player !== null) {
    console.log(errors.player)
    return <ErrorAlert errorMessage={'Error obteniendo detalles de jugador'}/>
  }

  if(player !== null) {
    return (
      <Container fluid>
        <PlayerForm player_info={player} page='edit' submitData={postPlayerForm}/>
      </Container>
    )

  }
}

export default page