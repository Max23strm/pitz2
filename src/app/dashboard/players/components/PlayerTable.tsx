'use client'
import { playersData } from "@/interfaces/players";
import {
  Button,
  Group,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { User } from "@mynaui/icons-react";
import Link from "next/link";
import { JSX, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import PlayerStatusBadge from "./PlayerStatusBadge";
import SearchBar from "./table/SearchBar";
import styles from '../styles/table.module.css'

const PlayerTable = ({players} : {players: playersData[] | null}) => {
    const matches = useMediaQuery("(min-width: 900px)");
    const [playerState, setPlayerState] = useState<playersData[] | null >(players)
    const [searchValue, setSearchValue] = useState('')

    const clearState = () => {
      setSearchValue('')
      setPlayerState(players)
    }

    const searchElem = (value : string) => {
      setSearchValue(value)
      if(players){
        if(value.length) {
          const foundElem = players.filter(p => p.firstName.toLowerCase().includes(value.toLowerCase()) || p.last_name.toLowerCase().includes(value.toLowerCase()))
          setPlayerState(foundElem)
        } else {
          setPlayerState(players)
        }
      }
    }

    let rows : JSX.Element[] = []
    if(playerState?.length) {
        rows = playerState.map((element : playersData) => (
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
      <Stack>
        <Group justify="space-between" className={styles.filter_section}>
          <SearchBar
            searchFn={searchElem}
            clearState={clearState}
            searchValue={searchValue}
          />
          <Button variant="gradient" component={Link} href={"/dashboard/players/new-player"}>
            Agregar jugador
          </Button>
        </Group>
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
      </Stack>
    )
}

export default PlayerTable