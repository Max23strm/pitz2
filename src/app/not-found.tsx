import { Button, Container, Text } from '@mantine/core'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <Container>
      <Text size="xl" fw={700}>Direccion erronea o en contrucción</Text>
      <Text>Todavía no arranco esto, banquen un poco</Text>
      <Button 
        component={Link}
        href={"/home"}
      >
        Volver a Inicio
      </Button>
    </Container>
  )
}