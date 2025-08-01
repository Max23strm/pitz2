export interface AllExpensesResponse {
    data:      SimpleExpense[];
    estado?:    string;
    mensaje?:    string;
    isSuccess: boolean;
}

export interface SimpleExpense {
    assigned_to: string;
    reason:     string,
    amount:      number;
    date:        Date;
    expense_uid: string;
}
