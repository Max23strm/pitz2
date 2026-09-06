'use client'
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { Paint } from "@mynaui/icons-react";

const ThemeSwitcher = () => {

    const { setColorScheme, } = useMantineColorScheme({keepTransitions: true,});
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });


    return (
        <ActionIcon 
            color='accent-pitz'
            variant='transparent'
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        >
            <Paint/>
        </ActionIcon>
    )
}

export default ThemeSwitcher