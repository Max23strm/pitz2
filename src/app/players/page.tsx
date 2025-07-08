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

interface playersResponse {
  player_uid: string;
  firstName: string;
  last_name: string;
  email: string;
  status: number;
  positions: string[];
}

let errors = { active: false, message: "" };

const playersPetition: playersResponse[] = await fetch(
  "http://localhost:3050/users"
)
  .then(async (response) => {
    const newResponse = await response.json();
    newResponse.forEach((res : {positions:string}) => {
      res.positions = JSON.parse(res.positions);
    });
    return newResponse;
  })
  .catch((e) => {
    console.log({ error: e });
    errors = { ...errors, active: true, message: "Error obteniendo datos" };
    return [];
  });

const page = () => {
  const rows = playersPetition.map((element) => (
    <TableTr key={`${element.player_uid}`}>
      <TableTd>{`${element.firstName} ${element.last_name}`}</TableTd>
      <TableTd>{element.email}</TableTd>
      <TableTd>{element.positions.join(",")}</TableTd>
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

  if (errors.active) {
    return  <Stack
      bg="var(--mantine-color-body)"
      align="start"
      justify="center"
      gap="md"
    >
      <Button variant="gradient" component={Link} href={"/players/new"}>
        Agregar jugador
      </Button>

      <Alert variant="light" color="red" title="Error obteniendo información" withCloseButton={false} icon={<DangerOctagon/>}>
        {errors.message}
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
      <Button variant="gradient" component={Link} href={"/players/new"}>
        Agregar jugador
      </Button>
    <section>
    </section>
      <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
        <TableThead>
          <TableTr>
            <TableTh>Nombre</TableTh>
            <TableTh>Correo electrónico</TableTh>
            <TableTh>Posición</TableTh>
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
