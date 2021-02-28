import { eventToString, WebhookEvent } from './../monobank/model/WebhookEvent';
import bodyParser from "body-parser";
import express from "express";
import { sendMessage } from "../telegram/bot";
import logger from "../logging/logger";
import { errorHandler, successHandler } from '../logging/morgan';
import { env } from '../../env';

export const launchServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(successHandler);
    app.use(errorHandler);
    
    app.post('/monobank', (req, res) => {
        const webhook = req.body as WebhookEvent;
        logger.info(`Got new data ${JSON.stringify(webhook)}`);
        sendMessage(eventToString(webhook));
        res.sendStatus(200);
    })
    
    app.listen(env.app.port, () => {
        logger.info(`App is listening on port ${env.app.port}`)
    })
}