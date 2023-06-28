import logger from '#logging/logger.js';
import bot from '#telegram/bot.js';
import env from '#utils/env.js';

async function _logAndSendMessage(chatId: string, message: string) {
    logger.info(`bot -> '${chatId}':\n${message}`);
    await (await bot()).telegram.sendMessage(chatId, message);
}

export const sendMessage = async (message: string) => {
    for (const chatId of env.app.telegram_receiver_ids) {
        // eslint-disable-next-line no-await-in-loop
        await _logAndSendMessage(chatId, message);
    }
};

export const sendRestrictedMessage = async (message: string) => {
    for (const chatId of env.app.telegram_restricted_view_ids) {
        // eslint-disable-next-line no-await-in-loop
        await _logAndSendMessage(chatId, message);
    }
};
