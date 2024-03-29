import { config } from 'dotenv';

config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: 'oracledb',
        connection: {
            user: process.env['APP_DB_USERNAME'],
            password: process.env['APP_DB_PASSWORD'],
            connectString: process.env['APP_DB_CONN_STRING']
        }
    },

    production: {
        client: 'oracledb',
        connection: {
            user: process.env['APP_DB_USERNAME'],
            password: process.env['APP_DB_PASSWORD'],
            connectString: process.env['APP_DB_CONN_STRING']
        }
    }
};
