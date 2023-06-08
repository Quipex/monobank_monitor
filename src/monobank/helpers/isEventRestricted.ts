import { env } from '@utils/env';
import { WebhookEvent } from '../model/WebhookEvent';

export function isEventRestricted({ data: { account, statementItem } }: WebhookEvent): boolean {
    if (env.app.monobank_restricted_view_cards.find(c => c === account)) {
        if (statementItem.amount > 0) {
            return true;
        }
    }
    return false;
}
