import logger from '#logging/logger.js';
import bot from '#telegram/bot.js';
import env from '#utils/env.js';


function _logAndSendMessage(message: string) {
    return function (chat_id: string) {
        logger.info(`bot -> '${chat_id}':\n${message}`);
        bot().telegram.sendMessage(chat_id, message);
    };
}

export const sendMessage = (message: string) => {
    env.app.telegram_receiver_ids.forEach(_logAndSendMessage(message));
};

export const sendRestrictedMessage = (message: string) => {
    env.app.telegram_restricted_view_ids.forEach(_logAndSendMessage(message));
};
