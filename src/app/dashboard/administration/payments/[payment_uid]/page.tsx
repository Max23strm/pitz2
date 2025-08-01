import ErrorAlert from "@/app/components/InformationDisplay/ErrorAlert";
import { paymentsDetailFetch } from "@/helpers/dataFetcher";
import { Button, Container, Grid, GridCol, Text } from "@mantine/core";
import dayjs from "@/helpers/dayjs";
import styles from '../styles/payments.module.css'
import React from "react";
import Link from "next/link";
import CancelPayment from "./components/CancelPayment";
import { formatCurrency } from "@/helpers/numberFormaters";

const page = async ({
    params,
}: {
    params: Promise<{ payment_uid: string }>;
}) => {
    const paymentParams = await params;
    const response = await paymentsDetailFetch(paymentParams.payment_uid);

    if (!response.isSucces) {
        return <ErrorAlert errorMessage={"Error obteniendo datos"} />;
    }

    if (!response.payment) {
        return <ErrorAlert errorMessage={"Pago no encontrado"} />;
    }

    return (
        <Container fluid>
            <Grid>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Nombre</Text>
                    <Text>{response.payment.player_name}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Monto</Text>
                    <Text>{formatCurrency(parseFloat(response.payment.amount))}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Tipo de pago</Text>
                    <Text>{response.payment.payment_name}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Referencia</Text>
                    <Text>{response.payment?.payment_reference ?? "-"}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Fecha de ingreso</Text>
                    <Text>{dayjs(response.payment.date).format("DD MMMM YYYY")}</Text>
                </GridCol>
                <GridCol span={{ base: 12 }}>
                    <Text fw={600} c="indigo.4">Comentarios</Text>
                    <Text>{response.payment?.comment ?? "-"}</Text>
                </GridCol>
                <GridCol span={{ base: 12, md: 4 }}>
                    <Text fw={600} c="indigo.4">Registrado por</Text>
                    <Text>{response.payment?.registered_by}</Text>
                </GridCol>

                <GridCol className={styles.editButtons}>
                    <Button
                        variant="subtle"
                        component={Link}
                        href={"/dashboard/administration/payments"}
                    >
                        Regresar
                    </Button>
                    <CancelPayment payment_uid={paymentParams.payment_uid}/>
                </GridCol>
            </Grid>
        </Container>
    );
};

export default page;
