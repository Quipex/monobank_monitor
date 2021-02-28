import * as dotenv from 'dotenv';
import { getOsEnv, getOsEnvArray } from './src/utils/path.helper';

dotenv.config();

interface EnvConfig {
    app: {
        port: number;
        bot_token: string;
        monobank_token: string;
        telegram_receiver_ids: string[];
    }
}

export const env: EnvConfig = {
    app: {
        port: +getOsEnv('APP_PORT'),
        bot_token: getOsEnv('APP_BOT_TOKEN'),
        monobank_token: getOsEnv('APP_MONOBANK_TOKEN'),
        telegram_receiver_ids: getOsEnvArray('APP_TELEGRAM_IDS')
    }
};
