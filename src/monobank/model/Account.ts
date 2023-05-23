export interface Account {
    id: string;
    balance: number;
    creditLimit: number;
    type: CardType;
    // ISO 4217
    currencyCode: number;
    cashbackType: CashbackType;
}

enum CardType {
    black,
    white,
    platinum,
    iron,
    fop,
    yellow
}

enum CashbackType {
    None, UAH, Miles
}
