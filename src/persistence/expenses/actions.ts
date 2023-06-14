import { knexConnection } from '#configuration/database.js';
import { Statement } from '#monobank/model/Statement.js';

const TABLE = 'EXPENSES';

const saveExpenses = async (expenses: Statement) => {
    return knexConnection(TABLE).insert(expenses);
};

export { saveExpenses };
