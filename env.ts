import * as dotenv from 'dotenv';
import { getOsEnv, getOsEnvArray } from './src/utils/path.helper';

dotenv.config();

interface EnvConfig {
    app: {
        port: number;
        bot_token: string;
        monobank_tokens: string[];
        telegram_receiver_ids: string[];
        monobank_token_names: string[];
        monobank_cards: string[];
    }
}

export const env: EnvConfig = {
    app: {
        port: +getOsEnv('APP_PORT'),
        bot_token: getOsEnv('APP_BOT_TOKEN'),
        monobank_tokens: getOsEnvArray('APP_MONOBANK_TOKEN'),
        monobank_token_names: getOsEnvArray('APP_MONOBANK_CARD_NAMES'),
        monobank_cards: getOsEnvArray('APP_MONOBANK_CARDS'),
        telegram_receiver_ids: getOsEnvArray('APP_TELEGRAM_IDS')
    }
};
