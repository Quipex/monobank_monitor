import { AxiosResponse } from 'axios';
import { Context } from 'telegraf';

import logger from '#logging/logger.js';
import { searchStatement } from '#monobank/api.js';
import { statementToString } from '#monobank/mappers/statement.js';
import { Statement } from '#monobank/model/Statement.js';
import { MessageUpdateHandler, MessageUpdateContext } from '#telegram/types.js';

import handleError from '../common/handleError.js';

const MAX_MESSAGE_LENGTH = 4000;

const handleStatements = (resp: AxiosResponse<Statement[]>, ctx: Context) => {
    const statements = resp.data;
    let message = '';
    statements
        .sort((st1, st2) => st2.time - st1.time)
        .forEach(st => {
            const statement = statementToString(st);
            if (message.length + statement.length > MAX_MESSAGE_LENGTH) {
                ctx.reply(message);
                message = statement;
            } else {
                if (message.length !== 0) {
                    message += '\n\n';
                }
                message += statement;
            }
        });
    if (message.length > 0) {
        ctx.reply(message);
    }
};

const sendOperations: MessageUpdateHandler = (ctx: MessageUpdateContext) => {
    const parts = ctx.message.text.split(' ');
    if (parts.length < 3) {
        ctx.reply('Use the command as follows: <card_index> <from> <to>');
        return;
    }

    const [, cardIndex, from, to] = parts;
    searchStatement(from, to, cardIndex)
        .then(resp => handleStatements(resp, ctx))
        .catch(ex => handleError(ex, ctx))
        .finally(() => logger.info(`Called search statement with [${parts}]`));
};

export default sendOperations;