'use client'

import styles from './styles/NavLink.module.css';
import { NavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UsersGroup, FolderKanban, FolderTwo, Home } from "@mynaui/icons-react";
function NavBar({toogleClick} : {toogleClick: ()=>void}) {
  const nav = [
    {
      name: 'Inicio',
      href: '/',
      icon: <Home size={16} stroke={1.5}/>,
      children : []
    },
    {
      name: 'Jugadores',
      icon: <UsersGroup size={16} stroke={1.5}/>,
      href: '/players',
      children : [
        { name: 'Todos', href: '/players' }
      ]
    },
    {
      name: 'Administración',
      icon: <FolderTwo size={16} stroke={1.5}/>,
      href: '/administration',
      children : [
        { name: 'Ingresos', href: '/administration/payments' },
        { name: 'Credenciales', href: '/administration/credentials' }
      ]
    },
    {
      name: 'Organización',
      icon: <FolderKanban size={16} stroke={1.5}/>,
      href: '/organization',
      children : [
        { name: "Calendarios", href: '/organization/events' },
        { name: "Partidos", href: '/organization/matches' },
        { name: "Entrenamientos", href: '/organization/trainings' }
      ]
    },
  ]

  const pathname = usePathname()

  const defineActive = (linkString : string) => {
    if( linkString === '/' && pathname === linkString) return true
    if( linkString !== '/' && pathname.includes(linkString)) return true

    return false
  }

  if(nav.length) {
      return (
        <>
          {
            nav.map( (e, i) => {
              
              if(!e.children?.length) {
                return (
                  <NavLink
                    key={`${e.href} - ${i} - padre`}
                    component={Link}
                    color="cyan"
                    variant="subtle"
                    className={styles.button}
                    label={e.name}
                    onClick={toogleClick}
                    href={e.href}
                    leftSection={e.icon}
                    active={ defineActive(e.href) }
                  />
                )
              }
              
              return (
                <NavLink
                  key={`${e.href} - ${i} - padre`}
                  color="cyan"
                  variant="subtle"
                  label={e.name}
                  className={styles.button}
                  leftSection={e.icon}
                  active={ defineActive(e.href) }
                >
                  {
                    e.children.length && e.children.map( (child, index) => (
                      <NavLink
                        key={`${child.href} - ${i} - ${index}`}
                        component={Link}
                        color="cyan"
                        onClick={toogleClick}
                        variant="subtle"
                        className={styles.button}
                        active={ defineActive(child.href) }
                        label={child.name}
                        href={child.href}
                      />
                    ) )
                  }
                </NavLink>
              )
            })
          }
        </>
      );
    }

  }


export default NavBar