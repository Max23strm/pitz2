import { SimpleUserResponse } from "@/interfaces/fetchers";

export const getBasicUser =  async () : Promise<SimpleUserResponse> => {
    const cookies = document.cookie.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

    const base64Url = authToken?.split('.')[1]
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload)
    const user_uid = payload.sub

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/' + "users/basics/" +  user_uid, {
            cache:'no-store', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.split('=')[1]}`,
            },
        })
        const result = await response.json();

        return result

    } catch(e) {
        return {
            isSuccess: false,
            error: `${e}`,
        }
    }
}