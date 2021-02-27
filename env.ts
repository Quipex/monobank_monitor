import * as dotenv from 'dotenv';
import { getOsEnv } from './src/utils/path.helper';

dotenv.config();

export const env = {
    app: {
        port: getOsEnv('APP_PORT'),
        bot_token: getOsEnv('BOT_TOKEN'),
        monobank_token: getOsEnv('MONOBANK_TOKEN'),
        telegram_receiver_id: getOsEnv('TELEGRAM_ID')
    }
};
