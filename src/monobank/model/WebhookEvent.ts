import { getCardName } from '../../utils/names.helper';
import { Statement, statementToString } from './Statement';

export interface WebhookEvent {
    type: string;
    data: {
        account: string;
        statementItem: Statement;
    }
}

export const eventToString = ({ data: { account, statementItem } }: WebhookEvent) => (
    `${statementToString(statementItem)}\n` +
    `Карта '${getCardName(account)}'`
)