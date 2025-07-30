import { login } from "@/interfaces/users";
export const postLogin = async ( loginValues: login ) => {
    'use client'

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "loginSession", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginValues),
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