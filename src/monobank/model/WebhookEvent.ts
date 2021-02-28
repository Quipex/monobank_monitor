import { Account, accountToString } from './Account';
import { Statement, statementToString } from './Statement';

export interface WebhookEvent {
    type: string;
    data: {
        account: Account;
        statementItem: Statement;
    }
}

export const eventToString = ({ data: { account, statementItem } }: WebhookEvent) => (
    `${accountToString(account)}\n${statementToString(statementItem)}`
)