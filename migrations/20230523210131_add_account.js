/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .alterTable('EXPENSES', (table) => {
            table
                .string('ACCOUNT', 255)
                .comment('Айді Акаунту');
        });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .alterTable('EXPENSES', (table) => {
            table.dropColumn('ACCOUNT');
        });
};
