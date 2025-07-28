import {
  Button,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import styles from "../../styles/Layout.module.css";
import pitzLogo from "@public/images/pitz-text.png";
import Image from "next/image";
import Link from "next/link";

const LoginCard = () => {
    return (
        <div className={styles.login_card}>
            <Image
                src={pitzLogo}
                width={250}
                alt="Pitz logo"
                className={styles.logo}
            />

            <Title order={2} className={styles.title}>
                ¡Bienvenido!
            </Title>

            <TextInput
                label="Correo electrónico"
                placeholder="hello@gmail.com"
                size="md"
                radius="md"
                className={styles.input}
            />
            <PasswordInput
                label="Contraseña"
                placeholder="tu contraseña"
                mt="md"
                size="md"
                radius="md"
                className={styles.input}
            />
            <Button fullWidth mt="xl" size="md" radius="md">
                Iniciar sesión
            </Button>
            <Button component={Link} href={'/forgot-password'} fullWidth mt="md" size="sm" radius="md" variant="subtle">
                Olvidé mi contraseña
            </Button>
        </div>
    );
};

export default LoginCard;
