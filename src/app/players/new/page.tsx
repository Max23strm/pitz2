import { Avatar, Checkbox, ComboboxData, Container, Grid, GridCol, Input, InputWrapper, MultiSelect, NativeSelect, SimpleGrid, Stack, Textarea } from '@mantine/core'
import styles from './styles/playerDetail.module.css'

const grupos_sanguineos : ComboboxData = [
  { label: 'A+', value: 'A+' },
  { label: 'O+', value: 'O+' },
  { label: 'B+', value: 'B+' },
  { label: 'AB+', value: 'AB+' },
  { label: 'A-', value: 'A-' },
  { label: 'O-', value: 'O-' },
  { label: 'B-', value: 'B-' },
  { label: 'A+', value: 'A+' },
]

const posiciones : ComboboxData  = [
  { label: 'Pilar Izquierdo', value: '1' },
  { label: 'Pilar Derecho', value: '3' },
  { label: 'Hooker', value: '2' },
  { label: 'Segunda Línea', value: '5' },
  { label: 'Tercera Línea', value: '6' },
  { label: 'Octavo', value: '8' },
  { label: 'Medio Scrum', value: '9' },
  { label: 'Apertura', value: '10' },
  { label: 'Primer Centro', value: '12' },
  { label: 'Segundo Centro', value: '13' },
  { label: 'Wing', value: '11' },
  { label: 'Fullback', value: '15' },
]

const page = () => {
  return (
    <Container size={'xl'}>
      <Grid>
        <GridCol span={{ base: 12, xs: 4 }}>
          <Avatar className={styles.image} />
        </GridCol>
        <GridCol span={{ base: 12, xs:8 }}>
          <GridCol>
            <InputWrapper label="Nombre">
              <Input radius="md" placeholder="Nombres" required/>
            </InputWrapper>
            <InputWrapper label="Apellido">
              <Input radius="md" placeholder="Apellidos" required/>
            </InputWrapper>
          </GridCol>
          <GridCol span={{ base: 12 }} className={styles.phone_fields}>
            <InputWrapper label="Telefono" className={styles.full_width}>
              <Input radius="md" placeholder="Telefono"/>
            </InputWrapper>
            <InputWrapper label="Dirección" className={styles.full_width}>
              <Input radius="md" placeholder="Dirección"/>
            </InputWrapper>
          </GridCol>
        </GridCol>
        <GridCol span={{ base: 12, xs:6 }} className={styles.simple_columns}>
            <NativeSelect label="Grupo sanguineo" radius="md" data={grupos_sanguineos} description={'Importante para tener registro'}/>
            <div className={styles.seguro_fields}>
              <Checkbox
                defaultChecked
                label="Seguro"
              />
              <InputWrapper className={styles.full_width}>
                <Input radius="md" placeholder="Nombre de seguro" required/>
              </InputWrapper>
            </div>
        </GridCol>
        <GridCol span={{ base: 12, xs:6 }} className={styles.simple_columns}>
            <MultiSelect label="Posición" radius="md" data={posiciones} />
            <Textarea
              className={styles.full_width}
              label="Comentarios"
              placeholder="Comentarios"
              />
        </GridCol>
      </Grid>
    </Container>
  )
}

export default page