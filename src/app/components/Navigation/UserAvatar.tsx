import { getBasicUser } from '@/helpers/dataFetcherClient'
import { SimpleUserData } from '@/interfaces/fetchers'
import { Avatar, Menu, MenuDropdown, MenuTarget, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { UserCircle, Logout  } from "@mynaui/icons-react";
import { useRouter } from 'next/navigation'



const UserAvatar = () => {
    const [userData, setUserData] = useState<SimpleUserData | null>()
    const [fetchState, setFetchState] = useState({loading: true, error: false})
    const router = useRouter()

    const handleCall = useCallback( async ()=> {
        setFetchState({error: false, loading: true})
        
        const user = await getBasicUser()
        if(!user.isSuccess) {
            setFetchState({error: true, loading: false})
            return
        }
        setUserData(user?.data ?? null)
        setFetchState({error: false, loading: false})
        return

    },[])

    useEffect(()=>{
        handleCall()
    },[handleCall])

    const logoutFn = () => {
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push('/login')
    }


    if(fetchState.loading) {
        return <Skeleton height={37} circle/>
    }
    if(fetchState.error) {
        return (
            <Avatar 
                color="red"
                name={'!'}
                alt='Error'
                variant='outline'
            />
        )

    }
    if(userData) {
        return (
            <Menu>
                <MenuTarget>
                    <Avatar 
                        color="orange"
                        name={userData.email}
                        alt={userData.email}
                        variant='outline'
                    />
                </MenuTarget>
                <MenuDropdown>
                    <Menu.Label>{userData.email}</Menu.Label>
                    <Menu.Item
                        component={Link}
                        href={'/dashboard/my-account'}
                        leftSection={<UserCircle/>}
                    >
                        Mi cuenta
                    </Menu.Item>
                    <Menu.Item onClick={logoutFn} leftSection={<Logout/>}>
                        Cerrar sesión
                    </Menu.Item>
                </MenuDropdown>
            </Menu>
        )
    }
}

export default UserAvatar