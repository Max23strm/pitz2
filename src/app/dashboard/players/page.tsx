import { playersGeneralFetch } from "@/helpers/dataFetcher";
import {
  Alert,
  Button,
  Stack,
} from "@mantine/core";
import { DangerOctagon } from "@mynaui/icons-react";
import Link from "next/link";
import PlayerTable from "./components/PlayerTable";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

  return <PlayerTable players={players} />

};

export default page;
