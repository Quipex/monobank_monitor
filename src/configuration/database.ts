import knexLib from 'knex';
import knexStringCase from 'knex-stringcase';

import env from '#utils/env.js';

const basicConfig = {
    client: 'oracledb',
    connection: {
        user: env.app.database_username,
        password: env.app.database_password,
        connectString: env.app.database_conn_string
    },
    stringcase: ['snakecase', 'uppercase']
};

const config = knexStringCase(basicConfig);

const knexConnection = knexLib.knex(config);

export { knexConnection };
