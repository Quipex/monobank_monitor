import { AxiosResponse } from 'axios';
import { Context, Telegraf } from 'telegraf'
import { env } from "../../env"
import logger from '../logging/logger';
import { Statement, statementToString } from '../monobank/model/Statement';
import { infoToString } from '../monobank/model/UserInfo';
import { clientInfo, searchStatement } from '../monobank/monobank'

const MAX_MESSAGE_LENGTH = 4000;

const handleError = (err: any, ctx: Context) => {
    const message = err.message;
    const url = err.config?.url;
    ctx.reply(`Got error:\n${JSON.stringify({ message, url }, null, 2)}`);
}

const authUser = async (ctx: Context, next: () => Promise<void>) => {
    const chatId = ctx.chat.id;
    logger.info(`${chatId} -> bot: '${ctx.message.text}'`);
    if (env.app.telegram_receiver_ids.find(id => id === chatId.toString())) {
        await next();
    } else {
        logger.warn(`Rejected ${chatId}: ${ctx.message.text}`)
        ctx.reply('You\'re not whitelisted');
    }
}

const sendClientInfo = (ctx: Context) => {
    clientInfo().then(resp => {
        ctx.reply(infoToString(resp.data))
    })
        .catch(ex => handleError(ex, ctx))
}

const handleStatements = (resp: AxiosResponse<Statement[]>, ctx: Context) => {
    const statements = resp.data;
    let message = '';
    statements.sort((st1, st2) => st2.time - st1.time).forEach(st => {
        const statement = statementToString(st);
        if (message.length + statement.length > MAX_MESSAGE_LENGTH) {
            ctx.reply(message);
            message = statement;
        } else {
            if (message.length !== 0) {
                message += '\n\n' + statement;
            } else {
                message += statement;
            }
        }
    })
    if (message.length > 0) {
        ctx.reply(message);
    }
}

const sendOperations = (ctx: Context) => {
    const parts = ctx.message.text.split(' ');
    searchStatement(parts[1], parts[2], parts[3])
        .then(resp => handleStatements(resp, ctx))
        .catch(ex => handleError(ex, ctx))
}

const launchBot = () => {
    logger.info('Launching bot');
    const bot = new Telegraf(env.app.bot_token);
    bot.use(authUser);
    bot.start(ctx => ctx.reply('Welcome!'));
    bot.command('/info', sendClientInfo);
    bot.command('/operations', sendOperations);
    bot.catch(handleError);
    bot.launch();
    return bot;
}

const bot = launchBot();

const _sendMessage = (id: string, message: string) => {
    logger.info(`bot -> '${id}': ${message}`);
    bot.telegram.sendMessage(id, message);
}

export const sendMessage = (message: string) => {
    env.app.telegram_receiver_ids.forEach(id => {
        _sendMessage(id, message);
    })
}
