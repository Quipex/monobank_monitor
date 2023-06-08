import { env } from '@utils/env';
import knex from 'knex';
import knexStringCase from 'knex-stringcase';

const basicConfig = {
    client: 'oracledb',
    connection: {
        user: env.app.database_username,
        password: env.app.database_password,
        connectString: env.app.database_conn_string,
    },
    stringcase: ['snakecase', 'uppercase']
};

const config = knexStringCase(basicConfig);

const knexConnection = knex(config);

export { knexConnection };
