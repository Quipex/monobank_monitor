import { Telegraf } from 'telegraf';

import logger from '#logging/logger.js';
import env from '#utils/env.js';
import handleError from './common/handleError.js';
import authUser from './features/authUser.js';
import sendCards from './features/sendCards.js';
import sendClientInfo from './features/sendClientInfo.js';
import sendOperations from './features/sendOperations.js';

let bot: Telegraf;

const launchBot = async () => {
    if (!bot) {
        logger.info('Launching bot');
        bot = new Telegraf(env.app.bot_token);
        bot.use(authUser);
        bot.start(ctx => ctx.reply('This is a private bot, you are not welcome.'));
        bot.command('/info', sendClientInfo);
        bot.command('/operations', sendOperations);
        bot.command('/cards', sendCards);
        bot.catch(handleError);
        try {
            await bot.launch();
            logger.info('Launched the bot');
        } catch (e) {
            logger.error('Failed to launch the bot', e);
            process.exit(1);
        }
    }
    return bot;
};

export default launchBot;
