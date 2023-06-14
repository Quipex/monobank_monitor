import { Telegraf } from 'telegraf';

import logger from '#logging/logger.js';
import env from '#utils/env.js';
import handleError from './common/handleError.js';
import authUser from './features/authUser.js';
import sendClientInfo from './features/sendClientInfo.js';
import sendOperations from './features/sendOperations.js';
import sendCards from './features/sendCards.js';

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
};

const bot = launchBot();

export default bot;
