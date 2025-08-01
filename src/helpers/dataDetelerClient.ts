import { PaymentIdResponse } from "@/interfaces/fetchers";

export const deletePayment = async (requestedPayment : string ): Promise<PaymentIdResponse> => {
    try {

        const cookies = document.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('authToken'))

        const payment_response = await Promise.resolve(
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/payments/deletePayment/" + requestedPayment,
                {
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken?.split('=')[1]}`,
                    },
                }
            ),
            
        );
        const response = (await payment_response.json())

        return {
            payment_uid: response.payment_uid,
            isSucces: response.isSuccess,
            errors : response?.isSuccess ?? null,
        };
    

    } catch (err) {
        return {
            payment_uid: null,
            isSucces: false,
            errors: `${err}`,
        };
    }
};