'use client'

import { usePathname , useParams } from 'next/navigation'
import { Breadcrumbs, Button } from '@mantine/core';
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
  payment_uid: { label: 'Detalle de pago', href: '' },
  administration: { label: 'Administación', href: null },
  credentials: { label: 'Credenciales', href: '/administration/credentials' },
  payments: { label: 'Pagos', href: '/administration/payments' },
  "new-payment": { label: 'Nuevo pago', href: '/administration/payments/new-payment' },
} as const;


const BreadCrumbs = () => {
    const path = usePathname()
    const params = useParams()
    const items = path.split('/').splice(1).map( (i, index) =>{
        if(i.length){
            const defineIfParam = (currentI : string) : string => {
                const pathElem = Object.keys(params).find(key => params[key as string] === currentI)
                return pathElem ?? i
            }
            const currentElem : PathConfig | null =  pathsandNames[defineIfParam(i)] ?? null 

            if(currentElem?.href === null) {
                return <Button color='indigo'  key={index + currentElem.label} className={styles.button} disabled variant='subtle' size="compact-sm">{currentElem.label}</Button>
            }
            return <Button key={index + ( currentElem?.href  ?? '')} color='indigo' variant='subtle' component={Link} href={currentElem?.href ?? '/'} size="compact-sm">
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