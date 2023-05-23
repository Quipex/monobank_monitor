import bodyParser from "body-parser";
import express from "express";
import logger from "../logging/logger";
import { errorHandler, successHandler } from '../logging/morgan';
import { env } from '../utils/env';
import { answerToMonobankGet } from './features/answerToMonobankGet';
import { handleNewPaymentEvent } from './features/handleNewPaymentEvent';

const app = express();

const launchServer = () => {
    app.use(bodyParser.json());
    app.use(successHandler);
    app.use(errorHandler);

    app.get('/monobank', answerToMonobankGet);
    app.post('/monobank', handleNewPaymentEvent);

    app.listen(env.app.port, () => {
        logger.info(`App is listening on port ${env.app.port}`);
    });
};

export { launchServer, app };
