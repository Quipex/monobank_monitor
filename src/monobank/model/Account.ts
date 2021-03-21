import { currency, toPrice } from '../../utils/money.helper';
import { getCardName } from '../../utils/names.helper';

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

export const accountToString = ({id, balance, currencyCode, type}: Account) => (
    `Карта '${getCardName(id)}' ${type} (баланс: ${toPrice(balance)} ${currency(currencyCode)}) `
)
