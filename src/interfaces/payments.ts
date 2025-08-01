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

export interface PaymentDetails {
    payment_uid:       string;
    payment_reference: null;
    amount:            string;
    comment:           string;
    date:              Date;
    player_name:       string;
    player_uid:        string;
    payment_name:      string;
    registered_by:     string;
}
