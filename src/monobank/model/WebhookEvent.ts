import { getCardName } from '../../utils/names.helper';
import { Statement, statementToRestrictedString, statementToString } from './Statement';
import { env } from "../../utils/env";

export interface WebhookEvent {
    type: string;
    data: {
        account: string;
        statementItem: Statement;
    }
}

export const eventToString = ({data: {account, statementItem}}: WebhookEvent) => (
    `${statementToString(statementItem)}\n` +
    `Карта '${getCardName(account)}'`
)

export const restrictedEventToString = ({data: { statementItem}}: WebhookEvent) => (
    `${statementToRestrictedString(statementItem)}`
)

export function isEventRestricted({data: {account, statementItem}}: WebhookEvent): boolean {
    if (env.app.monobank_restricted_view_cards.find(c => c === account)) {
        if (statementItem.amount > 0) {
            return true;
        }
    }
    return false;
}
