import { Button, Container, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import styles from './styles/notFount.module.css'
import logo from '@public/images/pitz-player.png'
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <Container className={styles.container}>
        <Image
            src={logo}
            width={150}
            alt={'not found logo'}
        />
        <Text size="xl" fw={700}>
            Direccion erronea o en contrucción
        </Text>
        <Text>Todavía no arranco esto, banquen un poco. O escriban bien la dirección</Text>
        <Button component={Link} href={"/dashboard/home"}>
            Volver a Inicio
        </Button>
    </Container>
  );
};

export default NotFoundPage;
