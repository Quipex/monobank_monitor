import { RequestHandler } from 'express-serve-static-core';
import { isEventRestricted } from '../../monobank/helpers/isEventRestricted';
import { eventToString, restrictedEventToString } from '../../monobank/mappers/webhookEvent';
import { WebhookEvent } from '../../monobank/model/WebhookEvent';
import { sendMessage, sendRestrictedMessage } from '../../telegram/bot';
import * as ExpensesRepository from '../../persistence/expenses/actions';

let lastEventId: string;

const handleNewPaymentEvent: RequestHandler = async (req, res) => {
    const webhook = req.body as WebhookEvent;
    const currentEventId = webhook.data.statementItem.id;

    // Prevent duplicate messages
    if (currentEventId === lastEventId) {
        res.sendStatus(200);
        return;
    }
    lastEventId = currentEventId;

    // First we send the restricted message to restricted recipients
    if (isEventRestricted(webhook)) {
        sendRestrictedMessage(restrictedEventToString(webhook));
    }
    // Then we send the regular message to other recipients
    sendMessage(eventToString(webhook));

    // Finally, we save the data
    await ExpensesRepository.saveExpenses(webhook.data.statementItem as any);
    res.sendStatus(200);
};

export { handleNewPaymentEvent };
