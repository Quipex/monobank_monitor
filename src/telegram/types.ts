import { Context, Middleware, NarrowedContext } from 'telegraf';
import { Message, Update } from 'telegraf/types';

type MessageUpdateContext = NarrowedContext<
    Context<Update>,
    { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number }
>;

type MessageUpdateHandler = Middleware<MessageUpdateContext>;

type GeneralUpdateHandler = Middleware<Context<Update>>;

export type { MessageUpdateContext, MessageUpdateHandler, GeneralUpdateHandler };
