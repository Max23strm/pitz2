import { Button, Container, Text } from "@mantine/core";
import Link from "next/link";
import styles from "./styles/notFount.module.css";
// import { useTranslations } from "next-intl";
import {getTranslations} from 'next-intl/server';
const NotFoundPage = async () => {
    const t = await getTranslations('Alerts');
    
    return (
        <Container className={styles.container}>
        <Text size="xl" fw={700}>
            {t('not_found_title')}
        </Text>
        <Text>
            {t('not_found_body')}
        </Text>
        <Link href={"/dashboard/home"}>
            <Button> {t('back_home')}</Button>
        </Link>
        </Container>
    );
};

export default NotFoundPage;
