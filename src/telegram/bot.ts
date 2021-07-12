import { AxiosResponse } from 'axios';
import { Context, Telegraf } from 'telegraf'
import { env } from "../utils/env"
import logger from '../logging/logger';
import { Statement, statementToString } from '../monobank/model/Statement';
import { infoToString } from '../monobank/model/UserInfo';
import { clientInfo as fetchClientInfo, searchStatement } from '../monobank/monobank'
import { getCardName } from '../utils/names.helper';

const MAX_MESSAGE_LENGTH = 4000;

const handleError = (err: any, ctx: Context) => {
    const message = err.message;
    const url = err.config?.url;
    ctx.reply(`Got error:\n${JSON.stringify({ message, url }, null, 2)}`);
}

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
        })
    if (message.length > 0) {
        ctx.reply(message);
    }
}

const authUser = async (ctx: Context, next: () => Promise<void>) => {
    const chatId = ctx.chat.id;
    logger.info(`${chatId} -> bot:\n'${ctx.message.text}'`);
    if (env.app.telegram_receiver_ids.find(id => id === chatId.toString())) {
        logger.info(`bot -> ${chatId}`);
        await next();
    } else {
        logger.warn(`Rejected ${chatId}: ${ctx.message.text}`);
        ctx.reply('You\'re not whitelisted');
    }
}

const sendClientInfo = (ctx: Context) => {
    const parts = ctx.message.text.split(' ');
    fetchClientInfo(parts[1])
        .then(resp => {
            ctx.reply(infoToString(resp.data))
        })
        .catch(ex => handleError(ex, ctx))
}

const sendOperations = (ctx: Context) => {
    const parts = ctx.message.text.split(' ');
    if (parts.length < 3) {
        ctx.reply('Use the command as follows: <card_index> <from> <to>');
        return;
    }
    searchStatement(parts[2], parts[3], parts[1])
        .then(resp => handleStatements(resp, ctx))
        .catch(ex => handleError(ex, ctx))
        .finally(() => logger.info(`Called search statement with [${parts}]`));
}

const sendCards = (ctx: Context) => {
    let message = '';
    env.app.monobank_cards.forEach((cardId, index) => {
        message += `${index + 1} - ${getCardName(cardId)}, '${cardId}'\n`;
    })
    ctx.reply(message);
}

const launchBot = () => {
    logger.info('Launching bot');
    const bot = new Telegraf(env.app.bot_token);
    bot.use(authUser);
    bot.start(ctx => ctx.reply('This is a private bot, you are not welcome.'));
    bot.command('/info', sendClientInfo);
    bot.command('/operations', sendOperations);
    bot.command('/cards', sendCards);
    bot.catch(handleError);
    bot.launch();
    return bot;
}

const bot = launchBot();

function _logAndSendMessage(message: string) {
    return function (chat_id: string) {
        logger.info(`bot -> '${chat_id}':\n${message}`);
        bot.telegram.sendMessage(chat_id, message);
    }
}

export const sendMessage = (message: string) => {
    env.app.telegram_receiver_ids.forEach(_logAndSendMessage(message))
}

export const sendRestrictedMessage = (message: string) => {
    env.app.telegram_restricted_view_ids.forEach(_logAndSendMessage(message))
}
