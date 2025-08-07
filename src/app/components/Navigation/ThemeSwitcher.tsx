'use client'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Paint } from "@mynaui/icons-react";

const ThemeSwitcher = () => {

    const { setColorScheme, colorScheme } = useMantineColorScheme();

    return (
        <ActionIcon 
            color='accent-pitz'
            variant='transparent'
            onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
        >
            <Paint/>
        </ActionIcon>
    )
}

export default ThemeSwitcher