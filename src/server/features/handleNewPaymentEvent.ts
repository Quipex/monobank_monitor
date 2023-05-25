import { RequestHandler } from 'express-serve-static-core';
import { isEventRestricted } from '../../monobank/helpers/isEventRestricted';
import { eventToString, restrictedEventToString } from '../../monobank/mappers/webhookEvent';
import { WebhookEvent } from '../../monobank/model/WebhookEvent';
import * as ExpensesRepository from '../../persistence/expenses/actions';
import { sendMessage, sendRestrictedMessage } from '../../telegram/bot';
import FixedLengthArray from '../../utils/fixed-length-array';

const lastEventIds = new FixedLengthArray<string>(10);

const handleNewPaymentEvent: RequestHandler = async (req, res) => {
    // We let monobank know ASAP that we're alive
    res.sendStatus(200);
    const webhook = req.body as WebhookEvent;
    const currentEventId = webhook.data.statementItem.id;

    // Prevent duplicate messages
    if (lastEventIds.contains(currentEventId)) {
        return;
    }
    lastEventIds.add(currentEventId);

    // First we send the restricted message to restricted recipients
    if (isEventRestricted(webhook)) {
        sendRestrictedMessage(restrictedEventToString(webhook));
    }
    // Then we send the regular message to other recipients
    sendMessage(eventToString(webhook));

    // Finally, we save the data
    const expense = { ...webhook.data.statementItem, account: webhook.data.account };
    try {
        await ExpensesRepository.saveExpenses(expense as any);
    } catch (e) {
        sendMessage(`Failed to save into DB 😢\nError: ${e.message}\nData: ${JSON.stringify(expense)}`)
    }
};

export { handleNewPaymentEvent };
