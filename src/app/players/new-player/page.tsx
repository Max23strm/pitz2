import { Container } from '@mantine/core'
import PlayerForm from '../components/PlayerForm'
import { playersDetailResponse } from '@/interfaces/players'
import dayjs from 'dayjs'

const page = () => {

  const playerInitialValue : playersDetailResponse = {
    address: '',
    afiliation: '',
    birth_dt: dayjs().toDate(),
    phone_number: '',
    blood_type: null,
    comments: null,
    credential: null,
    curp: null,
    email: '',
    enfermedad: null,
    firstName: '',
    last_name: '',
    player_uid: '',
    positions: null,
    sex: "Hombre",
    status: 1,
    emergency_number: '',
    insurance: false,
    insurance_name: null
  }


  return (
    <Container fluid>
      <PlayerForm player_info={playerInitialValue} page='new'/>
    </Container>
  )
}

export default page