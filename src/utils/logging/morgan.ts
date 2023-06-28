import morgan, { token } from 'morgan';

import logger from './logger.js';

token('message', (_req, res) => res.statusMessage || '');

const successResponseFormat = ':remote-addr - :method :url :status - :response-time ms';
const errorResponseFormat = ':remote-addr - :method :url :status - :response-time ms - message: :message';

export const successHandler = morgan(successResponseFormat, {
    skip: (_req, res) => res.statusCode >= 400,
    stream: { write: message => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
    skip: (_req, res) => res.statusCode < 400,
    stream: { write: message => logger.error(message.trim()) }
});
