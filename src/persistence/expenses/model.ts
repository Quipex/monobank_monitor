interface ExpensesModel {
    id: string;
    time: number;
    description: string;
    comment: string;
    mcc: number;
    original_mcc: number;
    amount: number;
    operation_amount: number;
    currency_code: number;
    commission_rate: number;
    cashback_amount: number;
    balance: number;
    receipt_id: string;
    invoice_id: string;
    counter_edrpou: string;
    counter_iban: string;
    counter_name: string;
    hold: boolean;
    account: string;
}

export type { ExpensesModel };
