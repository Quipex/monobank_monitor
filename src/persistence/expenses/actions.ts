import { Statement } from '../../monobank/model/Statement';
import { knexConnection } from '../../configuration/database';

const TABLE = 'EXPENSES';

const saveExpenses = async (expenses: Statement) => {
    return knexConnection(TABLE).insert(expenses);
};

export { saveExpenses };
