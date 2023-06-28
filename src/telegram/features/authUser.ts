import logger from '#logging/logger.js';
import { GeneralUpdateHandler } from '#telegram/types.js';
import env from '#utils/env.js';

const authUser: GeneralUpdateHandler = async (ctx, next) => {
    const chatId = ctx.chat.id;
    // noinspection HtmlUnknownAttribute
    const message = 'text' in ctx.message ? ctx.message.text : '<not a text message>';
    logger.info(`${chatId} -> bot:\n'${message}'`);
    if (env.app.telegram_receiver_ids.find(id => id === chatId.toString())) {
        logger.info(`bot -> ${chatId}`);
        await next();
    } else {
        logger.warn(`Rejected ${chatId}: ${message}`);
        await ctx.reply("You're not whitelisted");
    }
};

export default authUser;
