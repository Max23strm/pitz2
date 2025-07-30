import { playersGeneralFetch } from "@/helpers/dataFetcher";
import {
  Alert,
  Button,
  Stack,
} from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import Link from "next/link";
import PlayerTable from "./components/PlayerTable";

const page = async () => {
  const { players, errors, isSuccess } = await playersGeneralFetch();

  if (!isSuccess) {
    return (
      <Stack
        bg="var(--mantine-color-body)"
        align="start"
        justify="center"
        gap="md"
      >
        <Button
          variant="gradient"
          component={Link}
          href={"/dashboard/players/new-player"}
        >
          Agregar jugador
        </Button>

        <Alert
          variant="light"
          color="red"
          title="Error obteniendo información"
          withCloseButton={false}
          icon={<DangerOctagon />}
        >
          {errors}
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="start"
      justify="center"
      gap="md"
    >
      <Button variant="gradient" component={Link} href={"/dashboard/players/new-player"}>
        Agregar jugador
      </Button>
      <section></section>
      <PlayerTable players={players} />
    </Stack>
  );
};

export default page;
