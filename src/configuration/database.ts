import knex from 'knex';
import { env } from '../utils/env';

const knexConnection = knex({
    client: 'oracledb',
    connection: env.app.database_url
});

export { knexConnection };
