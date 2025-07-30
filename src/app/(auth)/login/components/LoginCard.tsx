'use client'
import {
  Button,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import styles from "../../styles/Layout.module.css";
import pitzLogo from "@public/images/pitz-text.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { postLogin } from "@/helpers/loginFn";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const LoginCard = () => {
    const router = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            user: '',
            password: '',
        },

        validate: {
            user: (value) => (value.length > 3 ? null : 'Invalid user'),
            password: (value) => (value.length < 3 ? 'Longitud invalida' : null ),
        },
    });
    const [isValidating, setIsValidating] = useState(false)
    type FormValues = typeof form.values;

    const handleLoing = async (values : FormValues) => {
        setIsValidating(true)
        const response = await postLogin(values)
        
        if(!response.isSuccess) {
            notifications.show({
                title: 'Error al iniciar sesión',
                message: 'Valide sus credenciales',
                color: 'red'
            })
            setIsValidating(false)
        } else {
            const expiration = new Date(response.expiration);
            document.cookie = `authToken=${
                response.token
            };expires=${expiration.toUTCString()};path=/`

            notifications.show({
                title: 'Bienvenido!',
                message: 'Valide sus credenciales',
                color: 'green'
            })

            router.push("/dashboard/home")
        }

    }

    return (
        <form className={styles.login_card} onSubmit={form.onSubmit(handleLoing)}>
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
                key={form.key('user')}
                {...form.getInputProps('user')}
            />
            <PasswordInput
                label="Contraseña"
                placeholder="tu contraseña"
                mt="md"
                size="md"
                radius="md"
                className={styles.input}
                key={form.key('password')}
                {...form.getInputProps('password')}
            />
            <Button fullWidth mt="xl" size="md" radius="md"  type="submit" loading={isValidating}>
                Iniciar sesión
            </Button>
            <Button component={Link} href={'/forgot-password'} fullWidth mt="md" size="sm" radius="md" variant="subtle">
                Olvidé mi contraseña
            </Button>
        </form>
    );
};

export default LoginCard;
