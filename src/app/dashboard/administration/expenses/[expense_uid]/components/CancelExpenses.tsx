"use client"
import { Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import stryles from '../../styles/expenses.module.css'
import { deleteExpense } from '@/helpers/dataDetelerClient';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

const CancelExpenses = ({expense_uid} : {expense_uid: string}) => {

    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter()
    const onDelete = async()=> {
        const response = await deleteExpense(expense_uid)

        if(response.isSucces) {
            notifications.show({
                color:'green',
                message:'Eliminado correctamente'
            })
            close()
            router.push('/dashboard/administration/expenses/')
            return
        } else{
            notifications.show({
                color:'red',
                message:'Error al eliminar'
            })
            return
        }
    
    }

    return (
        <>
           <Button
                color="red"
                onClick={open}
            >
                Eliminar
            </Button> 
            <Modal opened={opened} onClose={close} title="Confirmar acción" centered>
                <Text size="lg">¿Deseas eliminar este pago?</Text>
                <Group className={stryles.modalButtons}>
                    <Button variant='subtle'>
                        Cancelar
                    </Button>
                    <Button onClick={onDelete}>
                        Confirmar
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

export default CancelExpenses