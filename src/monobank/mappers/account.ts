import { currency, toPrice } from '#utils/money.helper.js';
import { getCardName } from '#utils/names.helper.js';

import { Account } from '../model/Account.js';

export const accountToString = ({ id, balance, currencyCode, type }: Account) =>
    `Карта '${getCardName(id)}' ${type} (баланс: ${toPrice(balance)} ${currency(currencyCode)}) `;
