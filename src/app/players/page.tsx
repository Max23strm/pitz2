import { playersGeneralFetch } from "@/helpers/dataFetcher";
import { playersResponse } from "@/interfaces/players";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { User, DangerOctagon, File } from "@mynaui/icons-react";
import Link from "next/link";
import { JSX } from "react";

const page = async () => {

  const { players, errors } = await playersGeneralFetch();
  let rows : JSX.Element[] = []
  if(players?.length) {
      rows = players.map((element : playersResponse) => (
        <TableTr key={`${element.player_uid}`}>
          <TableTd>{`${element.firstName} ${element.last_name}`}</TableTd>
          <TableTd>{element.email}</TableTd>
          <TableTd>
            <Badge
              variant="gradient"
              gradient={{
                from: element.status === 1 ? "violet" : "pink",
                to: element.status === 1 ? "cyan" : "orange",
                deg: 90,
              }}
            >
              {element.status === 1 ? "Activo" : "Inactivo"}
            </Badge>
          </TableTd>
          <TableTd>
            <ButtonGroup>
              <Button
                size="compact-sm"
                variant="outline"
              >
                <File/>
              </Button>
              <Button
                size="compact-sm"
                variant="filled"
                component={Link}
                href={`/players/${element.player_uid}`}
              >
                <User />
              </Button>
            </ButtonGroup>
          </TableTd>
        </TableTr>
      ));

  }
  
  if (errors.players) {
    return  <Stack
      bg="var(--mantine-color-body)"
      align="start"
      justify="center"
      gap="md"
    >
      <Button variant="gradient" component={Link} href={"/players/new-player"}>
        Agregar jugador
      </Button>

      <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
        {errors.players}
      </Alert>
    </Stack>
    
    
  }

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="start"
      justify="center"
      gap="md"
    >
      <Button variant="gradient" component={Link} href={"/players/new-player"}>
        Agregar jugador
      </Button>
    <section>
    </section>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <TableThead>
          <TableTr>
            <TableTh>Nombre</TableTh>
            <TableTh>Correo electrónico</TableTh>
            <TableTh>Estado</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </Stack>
  );
};

export default page;
