import { MessageUpdateHandler, MessageUpdateContext } from '#telegram/types.js';
import env from '#utils/env.js';
import { getCardName } from '#utils/names.helper.js';

const sendCards: MessageUpdateHandler = (ctx: MessageUpdateContext) => {
    let message = '';
    env.app.monobank_cards.forEach((cardId, index) => {
        message += `${index + 1} - ${getCardName(cardId)}, '${cardId}'\n`;
    });
    ctx.reply(message);
};

export default sendCards;
