import env from '#utils/env.js';

import { WebhookEvent } from '../model/WebhookEvent.js';

export function isEventRestricted({ data: { account, statementItem } }: WebhookEvent): boolean {
    if (env.app.monobank_restricted_view_cards.find(c => c === account)) {
        if (statementItem.amount > 0) {
            return true;
        }
    }
    return false;
}
