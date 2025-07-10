import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { paymentsResponse } from '@/interfaces/payments';
import { Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from 'dayjs';
import { JSX } from 'react'

const PaymentsTable = ({payments} : {payments: paymentsResponse[]}) => {

    let rows : JSX.Element[] = []
    if(payments?.length) {
        rows = payments.map((element : paymentsResponse) => (
            <TableTr key={`${element.payment_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd>{`${element.player_name}`}</TableTd>
                <TableTd> {element.payment_name} </TableTd>
                <TableTd>{formatCurrency(element.amount)}</TableTd>
            </TableTr>
        ));
    }

    return (
        <>
            <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
                <TableThead>
                <TableTr>
                    <TableTh>Fecha de ingreso</TableTh>
                    <TableTh>Nombre</TableTh>
                    <TableTh>Tipo</TableTh>
                    <TableTh>Monto</TableTh>
                </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
            { !rows.length && <NoRowsAlert/> }
        </>
    )
}

export default PaymentsTable