import NoRowsAlert from '@/app/components/InformationDisplay/NoRowsAlert';
import { formatCurrency } from '@/helpers/numberFormaters';
import { FileText } from "@mynaui/icons-react";
import { ActionIcon, Container, Loader, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from '@/helpers/dayjs'
import Link from 'next/link';
import { JSX } from 'react'
import { SimpleExpense } from '@/interfaces/expenses';

const ExpensesTable = ({expenses, loading, matches} : {expenses: SimpleExpense[], loading: boolean, matches:boolean}) => {

    let rows : JSX.Element[] = []
    if(expenses?.length) {
        rows = expenses.map((element : SimpleExpense) => (
            <TableTr key={`${element.expense_uid}`}>
                <TableTd>{dayjs(element.date).format('DD-MMM-YYYY')}</TableTd>
                <TableTd> {element.reason} </TableTd>
                {matches && <TableTd> {element.assigned_to} </TableTd>}
                <TableTd>{formatCurrency(element.amount)}</TableTd>
                <TableTd>
                    <ActionIcon
                        component={Link}                    
                        href={ 'expenses/' + element.expense_uid}
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
                    {matches && <TableTh>Responsable</TableTh> }
                    <TableTh>Monto</TableTh>
                </TableTr>
                </TableThead>
                {
                    !loading && 
                    <TableTbody>{rows}</TableTbody>
                }
                </Table>
                <Container>
                    { loading && <Loader color='#0C5C7A' size="lg" type="dots" />} 
                    { (!rows.length && !loading) && <NoRowsAlert/> }
                </Container>
        </>
    )
}

export default ExpensesTable