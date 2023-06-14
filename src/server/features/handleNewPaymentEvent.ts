import { RequestHandler } from 'express';
import pRetry from 'p-retry';

import { isEventRestricted } from '#monobank/helpers/isEventRestricted.js';
import { eventToString, restrictedEventToString } from '#monobank/mappers/webhookEvent.js';
import { WebhookEvent } from '#monobank/model/WebhookEvent.js';
import * as ExpensesRepository from '#persistence/expenses/actions.js';
import { sendMessage, sendRestrictedMessage } from '#telegram/features/sendMessage.js';
import FixedLengthArray from '#utils/fixed-length-array.js';

const lastEventIds = new FixedLengthArray<string>(10);

const DB_WRITE_RETRIES = 5;

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
        await pRetry(() => ExpensesRepository.saveExpenses(expense as any), { retries: DB_WRITE_RETRIES });
    } catch (e: any) {
        sendMessage(`Failed to save into DB after ${DB_WRITE_RETRIES} retries 😢\n`
            + `Error: ${e.message}\nData: ${JSON.stringify(expense)}`);
    }
};

export { handleNewPaymentEvent };
