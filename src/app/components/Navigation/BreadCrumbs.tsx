'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumbs, Button, Text } from '@mantine/core';
import { ChevronRight } from "@mynaui/icons-react";
import Link from 'next/link';
import styles from './styles/BreadCrumbs.module.css'

type PathConfig = {
  label: string;
  href: string | null;
};

const pathsandNames: Record<string, PathConfig> = {
  players: { label: 'Jugadores', href: '/players' },
  "new-player": { label: 'Nuevo jugador', href: '/players/new-player' },
  events: { label: 'Eventos', href: '/organization/events' },
  organization: { label: 'Organización', href: null },
  administration: { label: 'Administación', href: null },
  credentials: { label: 'Credenciales', href: '/administration/credentials' },
  payments: { label: 'Pagos', href: '/administration/payments' },
  "new-payment": { label: 'Nuevo pago', href: '/administration/payments/new-payment' },
} as const;


const BreadCrumbs = () => {
    const path = usePathname()

    const items = path.split('/').splice(1).map( i =>{
        if(i.length){
            const currentElem : PathConfig | null = pathsandNames[i] ?? null 

            if(currentElem?.href === null) {
                return <Button color='indigo' className={styles.button} disabled variant='subtle' size="compact-sm">{currentElem.label}</Button>
            }
            return <Button color='indigo' variant='subtle' component={Link} href={currentElem?.href ?? '/'} size="compact-sm">
                {currentElem?.label}
            </Button>
        } 
        return null
    })
    
    return (
        <Breadcrumbs
            className={styles.mainContainer}
            separator={<ChevronRight size={16}/>}
        >
            <Button color='indigo' component={Link} variant='subtle'  href={'/'} size="compact-sm">
                Inicio
            </Button>
            {items}
        </Breadcrumbs>
    )
}

export default BreadCrumbs