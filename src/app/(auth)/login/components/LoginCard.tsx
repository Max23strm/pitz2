'use client'
import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import styles from "../../styles/Authentication.module.css";
import { useForm } from "@mantine/form";
import { postLogin } from "@/helpers/loginFn";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginCard = () => {
    const t = useTranslations('Authentication');
    const router = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            user: '',
            password: '',
        },

        validate: {
            user: (value) => (value.length > 3 ? null : t('invalid_user')),
            password: (value) => (value.length < 3 ? t('invalid_length') : null ),
        },
    });
    const [isValidating, setIsValidating] = useState(false)
    type FormValues = typeof form.values;

    const handleLoing = async (values : FormValues) => {
        setIsValidating(true)
        const response = await postLogin(values)
        
        if(!response.isSuccess) {
            notifications.show({
                title: t('error_loggin_in'),
                message: t('validate_credentials'),
                color: 'red'
            })
            setIsValidating(false)
        } else {
            const expiration = new Date(response.expiration);
            document.cookie = `authToken=${
                response.token
            };expires=${expiration.toUTCString()};path=/`

            notifications.show({
                message: t('loged_successfully'),
                color: 'green'
            })

            router.push("/dashboard/home")
        }

    }

    return (
        <Paper shadow="sm" radius="sm" withBorder p="md" className={styles.login_card}>
            <form className={styles.login_form} onSubmit={form.onSubmit(handleLoing)}>
                {/* <Image
                    src={pitzLogo}
                    width={250}
                    alt="Pitz logo"
                    className={styles.logo}
                /> */}

                <Title order={2} className={styles.title}>
                    {t('title')}
                </Title>

                <TextInput
                    label={t('email_address')}
                    placeholder={t('insert_email_address')}
                    size="md"
                    radius="md"
                    className={styles.input}
                    key={form.key('user')}
                    {...form.getInputProps('user')}
                />
                <PasswordInput
                    label={t('password')}
                    placeholder={t('insert_password')}
                    mt="md"
                    size="md"
                    radius="md"
                    className={styles.input}
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <div className={styles.action_buttons_section}>
                    <Button fullWidth mt="xl" size="md" radius="md"  type="submit" loading={isValidating}>
                        {t('log_in')}
                    </Button>
                    <Button component={Link} href={'/forgot-password'} fullWidth size="md" radius="md" variant="subtle">
                        {t('i_forgot_password')}
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default LoginCard;
