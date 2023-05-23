import { currency, toPrice } from '../../utils/money.helper';
import { getCardName } from '../../utils/names.helper';
import { Account } from '../model/Account';


export const accountToString = ({ id, balance, currencyCode, type }: Account) => (
    `Карта '${getCardName(id)}' ${type} (баланс: ${toPrice(balance)} ${currency(currencyCode)}) `
);
