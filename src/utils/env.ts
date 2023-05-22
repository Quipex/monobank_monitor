import { getOsEnv, getOsEnvArray } from './path.helper';

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
        database_url: string;
    }
}

export const env: EnvConfig = {
    app: {
        port: +getOsEnv('APP_PORT'),
        bot_token: getOsEnv('APP_BOT_TOKEN'),
        telegram_receiver_ids: getOsEnvArray('APP_TELEGRAM_IDS'),
        monobank_tokens: getOsEnvArray('APP_MONOBANK_TOKEN'),
        monobank_token_names: getOsEnvArray('APP_MONOBANK_CARD_NAMES'),
        monobank_cards: getOsEnvArray('APP_MONOBANK_CARDS'),
        monobank_restricted_view_cards: getOsEnvArray('APP_TELEGRAM_RESTRICTED_VIEW_CARDS'),
        telegram_restricted_view_ids: getOsEnvArray('APP_TELEGRAM_RESTRICTED_VIEW_IDS'),
        database_url: getOsEnv('APP_DB_URL')
    }
};
