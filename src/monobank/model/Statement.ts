import moment from "moment-timezone";
import { currency, toPrice as _toPrice } from "../../utils/money.helper";

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

const _price = (currency: string) => (amount: number) => (`${_toPrice(amount)}${currency}`)

export const statementToString = (
    { time, description, amount, operationAmount, currencyCode, commissionRate, cashbackAmount, balance, comment }: Statement
) => {
    const operationSymbol = amount > 0 ? '🟢' : '🔴';
    const toPrice = _price(currency(currencyCode));
    const operation = amount === operationAmount
        ? `${operationSymbol} ${toPrice(amount)} (баланс 🏦: ${toPrice(balance)})\n`
        : `${operationSymbol} ${toPrice(amount)} (операция: ${toPrice(operationAmount)}) (баланс 🏦: ${toPrice(balance)})\n`;
    const timeText = `${moment(new Date(time * 1000)).format('llll')}\n`;
    let message = operation + timeText;
    if (description && description !== '') message += `Описание: ${description}\n`;
    if (comment && comment !== '') message += `Комментарий 👋: ${comment}\n`;
    if (commissionRate !== 0) message += `Комиссия 💱: ${toPrice(commissionRate)}\n`;
    if (cashbackAmount !== 0) message += `Кэшбек 💸: ${toPrice(cashbackAmount)}\n`;
    return message;
}