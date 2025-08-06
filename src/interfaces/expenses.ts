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

export interface ExpenseDetail {
    assigned_to_uid:   string;
    assigned_to:       string;
    reason:            string;
    amount:            string;
    registered_by_uid: string;
    date:              Date;
}
