import { Server } from 'node:http';

import bodyParser from 'body-parser';
import express from 'express';

import launchBot from '#telegram/bot.js';
import env from '#utils/env.js';
import logger from '#utils/logging/logger.js';
import { errorHandler, successHandler } from '#utils/logging/morgan.js';
import { answerToMonobankGet } from './features/answerToMonobankGet.js';
import { handleNewPaymentEvent } from './features/handleNewPaymentEvent.js';

const app = express();

let appServer: Server;

const launchServer = async () => {
    if (!appServer) {
        app.use(bodyParser.json());
        app.use(successHandler);
        app.use(errorHandler);

        app.get('/monobank', answerToMonobankGet);
        app.post('/monobank', handleNewPaymentEvent);

        appServer = app.listen(env.app.port, () => {
            logger.info(`App is listening on port ${env.app.port}`);
        });
        await launchBot();
    }
    return appServer;
};

export { app, launchServer };
