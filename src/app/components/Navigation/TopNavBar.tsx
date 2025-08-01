import Image from 'next/image'
import React from 'react'
import PitzLogo from '../../../../public/images/pitz-player.png'
import Link from 'next/link'
import { Burger } from '@mantine/core'
import styles from './styles/TopNavBar.module.css'
import ThemeSwitcher from './ThemeSwitcher'
import UserAvatar from './UserAvatar'

const TopNavBar = ({opened, onClick} : {opened: boolean, onClick: () => void}) => {

  return (
    <>
        <Burger opened={opened} onClick={onClick} hiddenFrom="sm" size="md" className={styles.menu_button}/>
      
        <Link href={'/dashboard/home'}>
            <Image
                src={PitzLogo}
                width={50}
                height={50}
                alt='pitzLogo'
            />
        </Link>

        <div className={styles.header_group}>
          <ThemeSwitcher/>
          <UserAvatar/>
        </div>
    </>
  )
}

export default TopNavBar