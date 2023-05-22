export interface Statement {
    id: string;
    // Unix time
    time: number;
    description: string;
    mcc: number;
    hold: boolean;
    amount: number;
    operationAmount: number;
    currencyCode: number;
    commissionRate: number;
    cashbackAmount: number;
    balance: number;
    comment: string;
    receiptId: string;
    counterEdrpou: string;
    counterIban: string;
}
