"use client"
import { Avatar, Button, Checkbox, Grid, GridCol, Group, MultiSelect, Select, Textarea, TextInput } from '@mantine/core'
import { grupos_sanguineos, posiciones, sexo } from '../helpers/options'
import styles from '../new-player/styles/playerDetail.module.css'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { playersDetailResponse, playerTypeForm } from '@/interfaces/players'
import { DatePickerInput } from '@mantine/dates'
import utc from 'dayjs/plugin/utc';
import Link from 'next/link'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

interface formInterface{
    player_info : playersDetailResponse, 
    page : 'edit' | 'new', 
    submitData:(value : playerTypeForm)=> Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string }>
}


const PlayerForm = ({player_info, page, submitData} : formInterface) => {
    dayjs.extend(utc);
    const router = useRouter()
    const handlePromise = async(data : playerTypeForm) => {

        notifications.show({
            title: 'Creando registro de jugador',
            message: 'Espere un segundo por favor',
        })
        const response = await submitData(data)

        if(response.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            router.push('/players/')
        } else {
            notifications.show({
                title: 'Error',
                message:'Ocurrió un error, intente nuevamente o contate a un administrador',
                color: 'red'
            })
        }
  
  }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { 
            address: player_info.address,
            afiliation: player_info.afiliation,
            birth_dt: dayjs(player_info.birth_dt).utc(),
            blood_type: player_info.blood_type,
            comments: player_info.comments,
            credential: player_info.credential,
            curp: player_info.curp,
            email: player_info.email,
            emergency_number: player_info.emergency_number,
            enfermedad: player_info.enfermedad,
            firstName: player_info.firstName,
            insurance_name: player_info.insurance_name,
            insurance: player_info.insurance,
            last_name: player_info.last_name,
            phone_number: player_info.phone_number,
            position: [],
            sex: player_info.sex,
        },
        validateInputOnBlur: true,
        validateInputOnChange:true,
        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => value.length < 2 ? 'Ingrese el nombre del jugador' : null,
            last_name: (value) => value.length < 1 ? 'Ingrese el apellido del jugador' : null,
            phone_number: (value) => value.length < 1 ? 'Ingrese el apellido del jugador' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
            birth_dt: (value) => (dayjs(value).isValid() ? null : 'Fecha invalida'),
        },
        transformValues: (values) =>({
            ...values,
            birth_dt:dayjs(values.birth_dt).isValid() ? dayjs(values.birth_dt).toISOString() : dayjs().toISOString(),
            position:values.position.length ? values.position : null
        }),
    });
    // console.log(form.values)
    return (
        <form  onSubmit={form.onSubmit(handlePromise)}> 
            <Grid gutter={{base: 15}}>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Avatar className={styles.image} />
                </GridCol>
                <GridCol span={{ base: 12, md:8 }}  className={styles.form_section}>
                    <GridCol>
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            withAsterisk
                            label="Nombre"
                            placeholder="Nombres"
                            key={form.key('firstName')}
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            className={styles.full_width}
                            withAsterisk
                            radius={'md'}
                            label="Apellidos"
                            placeholder="Apellidos"
                            key={form.key('last_name')}
                            {...form.getInputProps('last_name')}
                        />
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            withAsterisk
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                    </GridCol>
                    <GridCol span={{ base: 12}} className={styles.phone_fields}>
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            withAsterisk
                            label="Número telefónico"
                            placeholder="Número telefónico"
                            key={form.key('phone_number')}
                            {...form.getInputProps('phone_number')}
                        />
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            label="Dirección"
                            placeholder="Dirección"
                            key={form.key('address')}
                            {...form.getInputProps('address')}
                        />
                        <DatePickerInput
                            radius={'md'}
                            withAsterisk
                            label="Fecha de nacimiento"
                            className={styles.full_width}
                            key={form.key('birth_dt')}
                            {...form.getInputProps('birth_dt')}
                        />
                    </GridCol>
                </GridCol>
                <GridCol span={{ base: 12 }} className={styles.form_section}>
                    <GridCol span={{ base: 12 }} className={styles.field_row}>
                        <Select
                            className={styles.full_width}
                            radius={'md'}
                            withAsterisk
                            label="Género"
                            data={sexo}
                            placeholder="Selecciona un género"
                            key={form.key('sex')}
                            {...form.getInputProps('sex')}
                        />
                        <Select
                            className={styles.full_width}
                            radius={'md'}
                            label="Grupo sanguineo"
                            data={grupos_sanguineos}
                            placeholder="Selecciona un grupo sanguíneo"
                            key={form.key('blood_type')}
                            {...form.getInputProps('blood_type')}
                        />
                    </GridCol>
                    <GridCol span={{ base: 12 }}>
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            label='Enfermedades'
                            placeholder='Enfermedades crónicas o a notar'
                            key={form.key('enfermedad')}
                            {...form.getInputProps('enfermedad')}
                        />
                    </GridCol>
                </GridCol>
                <GridCol span={{ base: 12 }} className={styles.form_section}>
                    <div className={styles.seguro_fields}>
                        <Checkbox
                            label="Seguro"
                            labelPosition="left"
                            key={form.key('insurance')}
                            {...form.getInputProps('insurance')}
                        />
                        <TextInput
                            className={styles.full_width}
                            radius={'md'}
                            label="Nombre de seguro"
                            placeholder="Nombre de seguro"
                            key={form.key('insurance_name')}
                            {...form.getInputProps('insurance_name')}
                        />
                    </div>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label='Afiliación'
                        placeholder='Número de afiliado'
                        key={form.key('afiliation')}
                        {...form.getInputProps('afiliation')}
                    />
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label='Curp'
                        placeholder='Curp'
                        key={form.key('curp')}
                        {...form.getInputProps('curp')}
                    />
                    
                    <MultiSelect
                        label="Posición"
                        radius="md"
                        data={posiciones}
                        key={form.key('position')}
                        {...form.getInputProps('position')}
                    />
                    <Textarea
                        className={styles.full_width}
                        radius={'md'}
                        label='Comentario'
                        placeholder='Ingresa algun comentario'
                        key={form.key('comment')}
                        {...form.getInputProps('comment')}
                    />
                </GridCol>
            </Grid>

            <Group justify='space-between'>
                <Button 
                    component={Link}
                    href={'/players'}
                    variant='subtle'
                >
                    Regresar
                </Button>
                <Button
                    disabled={ !form.isDirty() || form.submitting}
                    loading={form.submitting}
                    type='submit'
                >
                    {
                        page === 'edit' ?
                            'Actualizar' : 'Crear'
                    }
                </Button>
            </Group>
        </form>
    )
}

export default PlayerForm