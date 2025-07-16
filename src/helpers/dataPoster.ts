"use server"

import { playerTypeForm } from "@/interfaces/players";

type payments = {
    player_uid: string;
    amount: number;
    reference: string;
    date: Date;
    payment_type_uid: string;
    comment: string;
}
export const postPaymentForm = async ( formValues: payments ) => {

    try {
        const response = await fetch(process.env.BASE_URL + '/api/' + "payments/new-payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
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
export const postPlayerForm = async ( formValues: playerTypeForm ) : Promise<{ isSuccess: boolean, estado?:string, error?:unknown, player_uid?: string }>  => {
    
    try {
        const response = await fetch(process.env.BASE_URL + '/api/' + "players/newPlayer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
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