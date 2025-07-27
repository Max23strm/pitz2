
import { putPlayersOptions } from "@/interfaces/players";

export const putPlayerForm = async ( value: putPlayersOptions ) : Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string }>  => {

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "players/editPlayer/" + value.player_uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        const result = await response.json();
        return result
    } catch(e) {
        return {
            isSuccess: false,
            error: e
        }
    }

}