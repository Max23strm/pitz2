'use client'
import { Button, Fieldset, Group, NumberInput, Select, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dollar } from '@mynaui/icons-react'
import styles from '../styles/components.module.css'
import { userGeneral, UsersGeneralResponse } from '@/interfaces/fetchers'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import dayjs from '@/helpers/dayjs'
import { postExpensesForm } from '@/helpers/dataPoster'
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation'
import { DatesProvider } from '@mantine/dates';


const ExpensesForm = ({ usersResponse } : {usersResponse: UsersGeneralResponse}) => {

    const router =  useRouter()


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { assigned_uid: '', amount: 0, date: dayjs().toDate(), reason:'' },
        validateInputOnBlur: true,
        // functions will be used to validate values at corresponding key
        validate: {
            assigned_uid: (value) => value.length < 2 ? 'Elija un jugador o usuario' : null,
            amount: (value) => value <= 0 ? 'El monto debe ser mayor a 0' : null,
            reason: (value) => (value.length < 2 ? 'Especifique la razon' : null),
        },
        transformValues: (values) => ({
            ...values,
            date: dayjs(values.date).toDate(),
        }),
    });
    type FormValues = typeof form.values;

    const handleSubmit = async ( formValue : FormValues ) => {
        notifications.show({
          title: 'Creando registro de gasto',
          message: 'Espere un segundo por favor',
        })
        const response = await postExpensesForm(formValue)
        if(response.isSuccess) {
            notifications.show({
                title: 'Éxito',
                message:'Registro realizado con éxito',
                color: 'green'
            })
            router.push('/dashboard/administration/payments/')
        } else {
            notifications.show({
                title: 'Error',
                message:'Ocurrió un error, intente nuevamente o contate a un administrador',
                color: 'red'
            })
        }
    }
    


    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
            <Fieldset className={styles.fieldSet}>
                <Select
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    label="Responsable del gasto"
                    data={usersResponse.data?.map((v : userGeneral ) => ({value: v.user_uid, label:`${v.last_name}, ${v.first_name}` }))}
                    placeholder="Selecciona un responsable"
                    key={form.key('assigned_uid')}
                    {...form.getInputProps('assigned_uid')}
                />

                <NumberInput
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    decimalScale={2}
                    thousandSeparator=","
                    label="Monto"
                    leftSection={<Dollar/>}
                    placeholder="Monto"
                    key={form.key('amount')}
                    {...form.getInputProps('amount')}
                />
                <DatesProvider settings={{locale:'es-mx'}}>
                    <DatePickerInput
                        radius={'md'}
                        withAsterisk
                        label="Fecha de gasto"
                        placeholder="Selecciones la fecha de gasto"
                        className={styles.fullWidthElement}
                        key={form.key('date')}
                        {...form.getInputProps('date')}
                    />
                </DatesProvider>
            </Fieldset>
            <Fieldset className={styles.fieldSet}>
                
                <Textarea
                    className={styles.fullWidthElement}
                    radius={'md'}
                    withAsterisk
                    label='Razón'
                    placeholder='Ingresa algun comentario'
                    key={form.key('reason')}
                    {...form.getInputProps('reason')}
                />
            </Fieldset>

            <Group justify='space-between' className={styles.fullWidthElement}>
                <Button 
                    component={Link}
                    href={'/dashboard/administration/expenses/'}
                    variant='subtle'
                >
                    Regresar
                </Button>
                <Button 
                    type='submit'
                    disabled={!form.isValid() || form.submitting}
                    loading={form.submitting}
                    variant='gradient'
                >
                    Enviar
                </Button>
            </Group>
            
        </form>
    )
}

export default ExpensesForm