import { Statement } from './Statement.js';

export interface WebhookEvent {
    type: string;
    data: {
        account: string;
        statementItem: Statement;
    };
}
