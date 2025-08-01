import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { FileText } from "@mynaui/icons-react";
import { ActionIcon, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import { SimpleExpense } from '@/interfaces/expenses';

const ExpensesTable = ({expenses} : {expenses: SimpleExpense[]}) => {

    let rows : JSX.Element[] = []
    if(expenses?.length) {
        rows = expenses.map((element : SimpleExpense) => (
            <TableTr key={`${element.expense_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd> {element.reason} </TableTd>
                <TableTd> {element.assigned_to} </TableTd>
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <TableTd>
                    <ActionIcon
                        component={Link}                    
                        href={'/dashboard/expenses/' + element.expense_uid}
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
                    <TableTh>Fecha</TableTh>
                    <TableTh>Concepto/razon</TableTh>
                    <TableTh>Responsable</TableTh>
                    <TableTh>Monto</TableTh>
                </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
            { !rows.length && <NoRowsAlert/> }
        </>
    )
}

export default ExpensesTable