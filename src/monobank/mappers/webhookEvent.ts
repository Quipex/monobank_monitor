import { getCardName } from '#utils/names.helper.js';
import { statementToRestrictedString, statementToString } from './statement.js';

import { WebhookEvent } from '../model/WebhookEvent.js';

export const eventToString = ({ data: { account, statementItem } }: WebhookEvent) =>
    `${statementToString(statementItem)}\n` + `Карта '${getCardName(account)}'`;

export const restrictedEventToString = ({ data: { statementItem } }: WebhookEvent) =>
    `${statementToRestrictedString(statementItem)}`;
