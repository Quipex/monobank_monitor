import knex from 'knex';
import knexStringCase from 'knex-stringcase';
import { env } from '../utils/env';

const basicConfig = {
    client: 'oracledb',
    connection: {
        user: env.app.database_username,
        password: env.app.database_password,
        connectString: env.app.database_conn_string,
        connectionTimeout: 100
    },
    stringcase: ['snakecase', 'uppercase']
};

const config = knexStringCase(basicConfig);

const knexConnection = knex(config);

export { knexConnection };