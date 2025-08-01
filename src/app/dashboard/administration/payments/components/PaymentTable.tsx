import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { paymentsResponse } from '@/interfaces/payments';
import { FileText } from "@mynaui/icons-react";
import { ActionIcon, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import { useMediaQuery } from '@mantine/hooks';

const PaymentsTable = ({payments} : {payments: paymentsResponse[]}) => {
    const matches = useMediaQuery("(min-width: 900px)");
    let rows : JSX.Element[] = []
    if(payments?.length) {
        rows = payments.map((element : paymentsResponse) => (
            <TableTr key={`${element.payment_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd>{`${element.player_name}`}</TableTd>
                {matches && <TableTd> {element.payment_name} </TableTd>}
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <TableTd>
                    <ActionIcon
                        component={Link}                    
                        href={'/dashboard/administration/payments/' + element.payment_uid}
                        variant='subtle'
                    >
                        <FileText/>
                    </ActionIcon>
                </TableTd>
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
                    {matches &&<TableTh>Tipo</TableTh>}
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