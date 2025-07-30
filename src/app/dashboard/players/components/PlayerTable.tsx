'use client'
import { playersData } from "@/interfaces/players";
import {
  Button,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { User } from "@mynaui/icons-react";
import Link from "next/link";
import { JSX } from "react";
import { useMediaQuery } from "@mantine/hooks";
import PlayerStatusBadge from "./PlayerStatusBadge";

const PlayerTable = ({players} : {players: playersData[] | null}) => {
    const matches = useMediaQuery("(min-width: 900px)");


    let rows : JSX.Element[] = []
    if(players?.length) {
        rows = players.map((element : playersData) => (
            <TableTr key={`${element.player_uid}`}>
            <TableTd>{`${element.firstName} ${element.last_name}`}</TableTd>
            {matches && <TableTd>{element.email}</TableTd>}
            <TableTd>
                <PlayerStatusBadge status={element.status}/>
            </TableTd>
            <TableTd>
                
                <Button
                    size="compact-sm"
                    variant="light"
                    component={Link}
                    href={`/dashboard/players/${element.player_uid}`}
                >
                    <User />
                </Button>
            </TableTd>
            </TableTr>
        ));

    }



    return (
        <Table stickyHeader stickyHeaderOffset={60} highlightOnHover >
        <TableThead>
          <TableTr>
            <TableTh>Nombre</TableTh>
            {matches && <TableTh >Correo electrónico</TableTh>}
            <TableTh>Estado</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    )
}

export default PlayerTable