import { Context } from 'telegraf';
import { Update } from 'telegraf/types';

const handleError = (err: any, ctx: Context<Update>) => {
    const message = err.message;
    const url = err.config?.url;
    ctx.reply(`Got error:\n${JSON.stringify({ message, url }, null, 2)}`);
};

export default handleError;
