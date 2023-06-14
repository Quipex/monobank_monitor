import { clientInfo as fetchClientInfo } from '#monobank/api.js';
import { infoToString } from '#monobank/mappers/userInfo.js';

import handleError from '../common/handleError.js';
import { MessageUpdateHandler } from '../types.js';

const sendClientInfo: MessageUpdateHandler = (ctx) => {
    const [, cardIndex] = ctx.message.text.split(' ');
    fetchClientInfo(cardIndex)
        .then(resp => {
            ctx.reply(infoToString(resp.data));
        })
        .catch(ex => handleError(ex, ctx));
};

export default sendClientInfo;
