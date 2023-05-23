import { Statement } from './Statement';

export interface WebhookEvent {
    type: string;
    data: {
        account: string;
        statementItem: Statement;
    };
}
