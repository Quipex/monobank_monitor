import { getCardName } from '@utils/names.helper';
import { WebhookEvent } from '../model/WebhookEvent';
import { statementToRestrictedString, statementToString } from './statement';


export const eventToString = ({ data: { account, statementItem } }: WebhookEvent) => (
    `${statementToString(statementItem)}\n` +
    `Карта '${getCardName(account)}'`
);

export const restrictedEventToString = ({ data: { statementItem } }: WebhookEvent) => (
    `${statementToRestrictedString(statementItem)}`
);
