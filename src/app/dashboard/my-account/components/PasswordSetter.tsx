'use client'
import { Grid, GridCol, Text, Button, PasswordInput } from '@mantine/core'
import styles from '../styles/my-account.module.css'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { putUpdatePassword } from '@/helpers/dataPutterClient'
import { notifications } from '@mantine/notifications'

const PasswordSetter = () => {
    const [isLoading, setisLoading] = useState(false)
     const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            password: '',
            passwordValidate: '',
        },
        validateInputOnChange:true,
        validate: {
            password: (value) => (value.length >= 3 ? null : 'La contraseña debería tener al menos 3 caracteres'),
            passwordValidate: (value, values) => (value !== values.password ? 'La contraseña deberían coincidir' : null ),
        },
    });

    type FormValues = typeof form.values;

    const handleSubmit = async (data : FormValues) => {
        setisLoading(true)
        const response = await putUpdatePassword(data.password)

        if(response.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message: 'Contraseña actualizada correctamente',
                color: 'green'
            })
        } else {
            notifications.show({
                title: 'Error',
                message: 'Error al intentar actualizar',
                color: 'red'
            })

        }
        setisLoading(false)
    }

    return (
        <GridCol>
            <Text size='xl' className={styles.titles}>
                Cambiar contraseña
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>

                <Grid >
                    <GridCol span={{base: 12, md: 6}}>
                        <PasswordInput
                            label="Contraseña nueva"
                            placeholder="Contraseña"
                            size="md"
                            radius="md"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                    </GridCol>
                    <GridCol span={{base: 12, md: 6}}>
                        <PasswordInput
                            label="Valide su contraseña"
                            placeholder="Contraseña"
                            size="md"
                            radius="md"
                            key={form.key('passwordValidate')}
                            {...form.getInputProps('passwordValidate')}
                        />
                    </GridCol>
                    <GridCol span={{base: 12}}>
                        <Button disabled={!form.isValid()} type='submit' loading={isLoading}>
                            Actualizar contraseña
                        </Button>
                    </GridCol>
                </Grid>
            </form>
        </GridCol>
    )
}

export default PasswordSetter