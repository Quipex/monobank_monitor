import {
    eventToString,
    isEventRestricted,
    restrictedEventToString,
    WebhookEvent
} from '../monobank/model/WebhookEvent';
import bodyParser from "body-parser";
import express from "express";
import { sendMessage, sendRestrictedMessage } from "../telegram/bot";
import logger from "../logging/logger";
import { errorHandler, successHandler } from '../logging/morgan';
import { env } from '../utils/env';

export const launchServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(successHandler);
    app.use(errorHandler);

    app.post('/monobank', (req, res) => {
        const webhook = req.body as WebhookEvent;
        logger.info(`Got new data ${JSON.stringify(webhook)}`);
        if (isEventRestricted(webhook)) {
            sendRestrictedMessage(restrictedEventToString(webhook));
        }
        sendMessage(eventToString(webhook));
        res.sendStatus(200);
    })

    app.listen(env.app.port, () => {
        logger.info(`App is listening on port ${env.app.port}`)
    })
}
