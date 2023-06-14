import moment from 'moment-timezone';

import { currency, toPrice as _toPrice } from '#utils/money.helper.js';

import { Statement } from '../model/Statement.js';


const _price = (curr: string) => (amount: number) => (`${_toPrice(amount)}${curr}`);
const _toUaPrice = _price(currency(980));
const _formattedTime = (time: number) => `${moment(new Date(time * 1000)).format('llll')}\n`;
const _description = (description: string) => `Описание: ${description}\n`;
const _comment = (comment: string) => `Комментарий 👋: ${comment}\n`;
const _commissionRate = (commissionRate: number) => `Комиссия 💱: ${_toUaPrice(commissionRate)}\n`;
const _cashback = (cashbackAmount: number) => `Кэшбек 💸: ${_toUaPrice(cashbackAmount)}\n`;

export const statementToString = (
    {
        time,
        description,
        amount,
        operationAmount,
        currencyCode,
        commissionRate,
        cashbackAmount,
        balance,
        comment
    }: Statement
) => {
    const operationSymbol = amount > 0 ? '🟢' : '🔴';
    const operation = amount === operationAmount
                      ? `${operationSymbol} ${_toUaPrice(amount)} (баланс 🏦: ${_toUaPrice(balance)})\n`
                      : `${operationSymbol} ${_toUaPrice(amount)} (операция: ${_price(currency(currencyCode))(operationAmount)}) (баланс 🏦: ${_toUaPrice(balance)})\n`;
    let message = operation + _formattedTime(time);
    if (description && description !== '') message += _description(description);
    if (comment && comment !== '') message += _comment(comment);
    if (commissionRate !== 0) message += _commissionRate(commissionRate);
    if (cashbackAmount !== 0) message += _cashback(cashbackAmount);
    return message;
};

export const statementToRestrictedString = (
    {
        time,
        description,
        amount,
        operationAmount,
        currencyCode,
        commissionRate,
        cashbackAmount,
        comment
    }: Statement
) => {
    const operation = amount === operationAmount
                      ? `+${_toUaPrice(amount)}\n`
                      : `${_toUaPrice(amount)} (операция: ${_price(currency(currencyCode))(operationAmount)})\n`;
    let message = operation + _formattedTime(time);
    if (description && description !== '') message += _description(description);
    if (comment && comment !== '') message += _comment(comment);
    if (commissionRate !== 0) message += _commissionRate(commissionRate);
    if (cashbackAmount !== 0) message += _cashback(cashbackAmount);
    return message;
};
