import * as dotenv from 'dotenv';

import { getOsEnv, getOsEnvArray } from './path.helper.js';

// We need to load .env file first
dotenv.config();

interface EnvConfig {
    app: {
        port: number;
        bot_token: string;
        telegram_receiver_ids: string[];
        monobank_tokens: string[];
        monobank_token_names: string[];
        monobank_cards: string[];
        monobank_restricted_view_cards: string[];
        telegram_restricted_view_ids: string[];
        database_conn_string: string;
        database_username: string;
        database_password: string;
    };
}

const env: EnvConfig = {
    app: {
        port: +getOsEnv('APP_PORT'),
        bot_token: getOsEnv('APP_BOT_TOKEN'),
        telegram_receiver_ids: getOsEnvArray('APP_TELEGRAM_IDS'),
        monobank_tokens: getOsEnvArray('APP_MONOBANK_TOKEN'),
        monobank_token_names: getOsEnvArray('APP_MONOBANK_CARD_NAMES'),
        monobank_cards: getOsEnvArray('APP_MONOBANK_CARDS'),
        monobank_restricted_view_cards: getOsEnvArray('APP_TELEGRAM_RESTRICTED_VIEW_CARDS'),
        telegram_restricted_view_ids: getOsEnvArray('APP_TELEGRAM_RESTRICTED_VIEW_IDS'),
        database_conn_string: getOsEnv('APP_DB_CONN_STRING'),
        database_username: getOsEnv('APP_DB_USERNAME'),
        database_password: getOsEnv('APP_DB_PASSWORD'),
    }
};

export type { EnvConfig };

export default env;
