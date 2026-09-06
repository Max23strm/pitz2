import { defineActive, NavElement } from '@/app/utils/navigation'
import { Menu, MenuDropdown, MenuItem, MenuTarget, NavLink } from '@mantine/core'
import Link from 'next/link'
import styles from '@/app/components/styles/appshell.module.css'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { ChevronDown  } from "@mynaui/icons-react";


const TopNavigationLink = ({navElem}: {navElem: NavElement}) => {
    const pathname = usePathname();
      
    const t = useTranslations('Navigation')
    if(navElem.children !== undefined && navElem.children.length) {
        return <Menu shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={200}>
            <MenuTarget >
                <NavLink
                    className={styles.nav_father}
                    label={t(navElem.name)}
                    active={defineActive(navElem.href, pathname)}
                    rightSection={<ChevronDown size={16} stroke={2}/>}
                />
            </MenuTarget>
            <MenuDropdown>
                {
                    navElem.children.map((chi, index)=>(
                        <MenuItem leftSection={chi.icon} component={Link} href={chi.href} key={`${index} -children- ${navElem.name}`} >
                            {t(chi.name)}
                        </MenuItem>
                    ))
                }
            </MenuDropdown>
        </Menu>
    }
 

    return (
        <NavLink
            component={Link}
            variant="subtle"
            className={styles.nav_father}
            label={t(navElem.name)}
            // onClick={toogleClick}
            href={navElem.href}
            active={defineActive(navElem.href, pathname)}
        />
    )
}

export default TopNavigationLink