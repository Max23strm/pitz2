'use client' // Error boundaries must be Client Components
 
import { Button, Stack, Title } from '@mantine/core'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Stack
      h={250}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >
      <Title order={1}>Algo salió mal</Title>
      <Button
        onClick={
          () => reset()
        }
      >
        Intentar nuevamente
      </Button>
    </Stack>
  )
}