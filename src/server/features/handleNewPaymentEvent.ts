import { RequestHandler } from 'express';
import pRetry, { FailedAttemptError } from 'p-retry';

import logger from '#logging/logger.js';
import { isEventRestricted } from '#monobank/helpers/isEventRestricted.js';
import { eventToString, restrictedEventToString } from '#monobank/mappers/webhookEvent.js';
import { WebhookEvent } from '#monobank/model/WebhookEvent.js';
import * as ExpensesRepository from '#persistence/expenses/actions.js';
import { sendMessage, sendRestrictedMessage } from '#telegram/features/sendMessage.js';
import FixedLengthArray from '#utils/fixed-length-array.js';

const lastEventIds = new FixedLengthArray<string>(10);

const DB_WRITE_RETRIES = 5;

const handleFailedAttempt = (error: FailedAttemptError) => {
    if (error.attemptNumber === 1) {
        logger.error(`[1st attempt] Failed to save into DB.\nError: ${error.message}`);
        return;
    }
};

async function persistToDb(webhook: WebhookEvent) {
    const expense = { ...webhook.data.statementItem, account: webhook.data.account };
    try {
        await pRetry(() => ExpensesRepository.saveExpenses(expense as any), {
            retries: DB_WRITE_RETRIES,
            onFailedAttempt: handleFailedAttempt
        });
    } catch (e: any) {
        await sendMessage(
            `Failed to save into DB after ${DB_WRITE_RETRIES} retries 😢\n` +
                `Error: ${e.message}\nData: ${JSON.stringify(expense)}`
        );
    }
}

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
        await sendRestrictedMessage(restrictedEventToString(webhook));
    }
    // Then we send the regular message to other recipients
    await sendMessage(eventToString(webhook));

    // Finally, we save the data
    await persistToDb(webhook);
};

export { handleNewPaymentEvent };
