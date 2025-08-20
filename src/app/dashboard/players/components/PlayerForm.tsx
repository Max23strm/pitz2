"use client"
import { Avatar, Button, Card, Checkbox, Grid, GridCol, Group, Select, SelectProps, Text, Textarea, TextInput } from '@mantine/core'
import { estados, grupos_sanguineos, sexo } from '../helpers/options'
import styles from '../new-player/styles/playerDetail.module.css'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { playersDetailResponse, playerTypeForm, playerTypeFormWithStatusAsString, putPlayersOptions } from '@/interfaces/players'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import utc from 'dayjs/plugin/utc';
import Link from 'next/link'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { putPlayerForm } from '@/helpers/dataPutter'
import { postPlayerForm } from '@/helpers/dataPoster'
import PlayerStatusBadge from './PlayerStatusBadge'

type Response = { isSuccess: boolean; estado?: string; error?: unknown; player_uid?: string }

interface FormEditInterface {
  player_info: playersDetailResponse;
  page: 'edit';
  player_uid: string;
}

interface FormNewInterface {
  player_info: playersDetailResponse;
  page: 'new';
  player_uid?: string
}

type formInterface = FormEditInterface | FormNewInterface;

const PlayerForm = ({player_info, page, player_uid} : formInterface) => {
    dayjs.extend(utc);
    const router = useRouter()
    const hanleResponse = (res : Response) => {
        if(res.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            router.push('/dashboard/players/')
        } else {
            notifications.show({
                title: 'Error',
                message:'Ocurrió un error, intente nuevamente o contate a un administrador',
                color: 'red'
            })
        }
    }
    const handlePromise = async(data : playerTypeForm) => {

        if (page === 'new') {
            notifications.show({
                title: 'Creando registro de jugador',
                message: 'Espere un segundo por favor',
            })

            const response = await postPlayerForm({...data, status : data.status === '1' ? 1 : 0} as playerTypeFormWithStatusAsString);
            hanleResponse(response)
        } else {
            notifications.show({
                title: 'Editando registro de jugador',
                message: 'Espere un segundo por favor',
            })

            const dataToSend : Partial<putPlayersOptions> = {}
            const keys = Object.keys(form.getDirty()) as (keyof Partial<putPlayersOptions>)[];
            
            keys.forEach((key) => {
                const value : string | string[] | boolean | null = data[key as keyof playerTypeForm]
                if (key === 'status') {
                    dataToSend[key] = value === '1' ? 1 : 0;
                } else {
                    Object.assign(dataToSend, {[key] : value})
                }
            });

            const response = await putPlayerForm({...dataToSend, player_uid} as putPlayersOptions);
            hanleResponse(response)

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
            status: player_info.status,
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
            phone_number: (value) => value.length < 1 ? 'Ingrese un teléfono válido' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
            birth_dt: (value) => (dayjs(value).isValid() ? null : 'Fecha invalida'),
        },
        transformValues: (values) =>({
            ...values,
            birth_dt:dayjs(values.birth_dt).isValid() ? dayjs(values.birth_dt).toISOString() : dayjs().toISOString(),
            position:values.position.length ? values.position : null
        }),
    });
    const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
        <Group flex="1" gap="xs">
            <PlayerStatusBadge status={parseInt(option.value)}/>
        </Group>
    );
    
    const status = form.getValues().status
    const sex = form.getValues().sex

    return (
        <form onSubmit={form.onSubmit(handlePromise)} className={styles.form}> 
            <Grid gutter={{base: 12}} className={styles.fields}>
                <GridCol span={{ base: 12, md:5, lg:3 }}>
                    <Card className={styles.tabs_section} style={{background: status === '0' ? 'linear-gradient(145deg, var(--mantine-color-indigo-filled) 0%, var(--mantine-color-accent-pitz-filled) 100%)' : 'linear-gradient(145deg, var(--mantine-color-indigo-filled) 0%, var(--mantine-color-primary-pitz-filled) 100%)'}} radius={'lg'}>
                        <Avatar className={styles.image} variant='gradient' gradient={{ from: sex === 'Mujer' ? 'red' :'indigo', to: 'primary-pitz', deg: 135 }}/>

                        <div className={styles.nav_buttons}>
                            <Button 
                                variant='default'
                                component='a'
                                size='sm'
                                href='#info-básica'
                            >
                                Información básica
                            </Button>
                            <Button 
                                variant='default'
                                component='a'
                                size='sm'
                                href='#info-médica'
                            >
                                Información médica
                            </Button>
                            <Button 
                                variant='default'
                                component='a'
                                size='sm'
                                href='#otra-info'
                            >
                                Otra información
                            </Button>
                        </div>
                    </Card>    
                </GridCol>
            <GridCol span={{ base: 12, md:7, lg:9 }}>
            <Grid gutter={{base: 12}} className={styles.fields}>
                <GridCol span={{ base: 12 }}>
                    <Text variant='gradient' fw={700} size='xl' id='info-básica'>Información básica</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        withAsterisk
                        label="Nombre"
                        placeholder="Nombres"
                        key={form.key('firstName')}
                        {...form.getInputProps('firstName')}
                    />
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <TextInput
                        className={styles.full_width}
                        withAsterisk
                        radius={'md'}
                        label="Apellidos"
                        placeholder="Apellidos"
                        key={form.key('last_name')}
                        {...form.getInputProps('last_name')}
                    />
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
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
                <GridCol span={{ base: 12 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label="Dirección"
                        placeholder="Dirección"
                        key={form.key('address')}
                        {...form.getInputProps('address')}
                        />
                </GridCol>
                <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        withAsterisk
                        label="Número telefónico"
                        placeholder="Número telefónico"
                        key={form.key('phone_number')}
                        {...form.getInputProps('phone_number')}
                    />
                </GridCol>
                <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                    <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0],  }}>
                        <DatePickerInput
                            radius={'md'}
                            withAsterisk
                            label="Fecha de nacimiento"
                            className={styles.full_width}
                            key={form.key('birth_dt')}
                            {...form.getInputProps('birth_dt')}
                        />
                    </DatesProvider>
                </GridCol>
                <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
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
                    </GridCol>
                <GridCol span={{ base: 12, sm:6, md: 4, lg:3 }}>
                    <Select
                        className={styles.full_width}
                        radius={'md'}
                        withAsterisk
                        label="Estado"
                        data={estados}
                        placeholder="Selecciona un estado"
                        key={form.key('status')}
                        renderOption={renderSelectOption}
                        {...form.getInputProps('status')}
                    />
                </GridCol>
                <GridCol span={{ base: 12 }}>
                    <Text variant='gradient' fw={700} size='xl' id='info-médica'>Información médica</Text>
                </GridCol>
                <GridCol span={{ base: 12, md:6, lg: 4 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label='Enfermedades'
                        placeholder='Enfermedades crónicas o a notar'
                        key={form.key('enfermedad')}
                        {...form.getInputProps('enfermedad')}
                    />
                </GridCol>
                <GridCol span={{ base: 12, md:6, lg: 4 }}>
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
                <GridCol span={{ base: 12, md:12, lg:4 }}>
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
                </GridCol>
                <GridCol span={{ base: 12 }}>
                    <Text variant='gradient' fw={700} size='xl' id='otra-info'>Otra información</Text>
                    
                </GridCol >
                <GridCol span={{ base: 12, md:6 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label='Afiliación'
                        placeholder='Número de afiliado'
                        key={form.key('afiliation')}
                        {...form.getInputProps('afiliation')}
                    />
                </GridCol>
                <GridCol span={{ base: 12, md:6 }}>
                    <TextInput
                        className={styles.full_width}
                        radius={'md'}
                        label='Curp'
                        placeholder='Curp'
                        key={form.key('curp')}
                        {...form.getInputProps('curp')}
                    />
                    
                    {/* <MultiSelect
                        label="Posición"
                        radius="md"
                        data={posiciones}
                        key={form.key('position')}
                        {...form.getInputProps('position')}
                    /> */}
                </GridCol>
                <GridCol span={{ base: 12 }}>
                    <Textarea
                        className={styles.full_width}
                        radius={'md'}
                        label='Comentario'
                        placeholder='Ingresa algun comentario'
                        key={form.key('comment')}
                        {...form.getInputProps('comment')}
                    />
                </GridCol>
                <GridCol span={{ base: 12 }}>
                <Group  className={styles.butones}>
                    <Button 
                        component={Link}
                        href={'/dashboard/players'}
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
                </GridCol>
            </Grid>
                </GridCol>
            </Grid>

        </form>
    )
}

export default PlayerForm