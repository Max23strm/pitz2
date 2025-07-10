export interface paymentsResponse {
    player_uid: string;
    player_name: string;
    payment_uid: string;
    date: string;
    amount: number;
    payment_name: string;
}

export interface paymentTypesResponse {
    payment_type_uid: string;
    payment_name: string;
}