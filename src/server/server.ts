import bodyParser from 'body-parser';
import express from 'express';

import env from '#utils/env.js';
import logger from '#utils/logging/logger.js';
import { errorHandler, successHandler } from '#utils/logging/morgan.js';
import parsedPackage from '#utils/package.helper.js';
import { answerToMonobankGet } from './features/answerToMonobankGet.js';
import { handleNewPaymentEvent } from './features/handleNewPaymentEvent.js';


const app = express();

const launchServer = () => {
    app.use(bodyParser.json());
    app.use(successHandler);
    app.use(errorHandler);

    app.get('/monobank', answerToMonobankGet);
    app.post('/monobank', handleNewPaymentEvent);

    app.listen(env.app.port, () => {
        logger.info(`App is listening on port ${env.app.port}\n` +
            `App version: ${parsedPackage.version}`);
    });
};

export { app, launchServer };

