'use client'
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { Sun, Moon  } from "@mynaui/icons-react";

const ThemeSwitcher = () => {

    const { setColorScheme, } = useMantineColorScheme({keepTransitions: true,});
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });


    return (
        <ActionIcon 
            color='accent-pitz'
            variant='transparent'
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        >
            {
                computedColorScheme === 'light' ? <Sun/> :<Moon/>
            }
        </ActionIcon>
    )
}

export default ThemeSwitcher