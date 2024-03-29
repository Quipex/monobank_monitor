import { RequestHandler } from 'express';

import { isEventRestricted } from '#monobank/helpers/isEventRestricted.js';
import { eventToString, restrictedEventToString } from '#monobank/mappers/webhookEvent.js';
import { WebhookEvent } from '#monobank/model/WebhookEvent.js';
import { sendMessage, sendRestrictedMessage } from '#telegram/features/sendMessage.js';
import FixedLengthArray from '#utils/fixed-length-array.js';

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
        await sendRestrictedMessage(restrictedEventToString(webhook));
    }
    // Then we send the regular message to other recipients
    await sendMessage(eventToString(webhook));
};

export { handleNewPaymentEvent };
