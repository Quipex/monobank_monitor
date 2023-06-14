/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('EXPENSES', (table) => {
            table.string('ID', 255).primary().notNullable();
            table.bigint('TIME')
                .comment('seconds, unix time');
            table.string('DESCRIPTION');
            table.string('COMMENT')
                .comment('Коментар до переказу, уведений користувачем. Якщо не вказаний, поле буде відсутнім')
            table.integer('MCC')
                .comment('Код типу транзакції (Merchant Category Code), відповідно ISO 18245');
            table.integer('ORIGINAL_MCC');
            table.bigint('AMOUNT')
                .comment('Сума у валюті рахунку в мінімальних одиницях валюти (копійках, центах)');
            table.bigint('OPERATION_AMOUNT')
                .comment('-//- транзакції');
            table.integer('CURRENCY_CODE')
                .comment('Код валюти рахунку відповідно ISO 4217');
            table.bigint('COMMISSION_RATE')
                .comment('Розмір комісії в мінімальних одиницях валюти (копійках, центах)');
            table.bigint('CASHBACK_AMOUNT')
                .comment('Розмір кешбеку в мінімальних одиницях валюти (копійках, центах)');
            table.bigint('BALANCE')
                .comment('Баланс рахунку в мінімальних одиницях валюти (копійках, центах)');
            table.string('RECEIPT_ID', 255)
                .comment('Номер квитанції для check.gov.ua. Поле може бути відсутнім');
            table.string('INVOICE_ID', 255)
                .comment('Номер квитанції ФОПа, приходить у випадку якщо це операція із зарахуванням коштів');
            table.string('COUNTER_EDRPOU', 255)
                .comment('ЄДРПОУ контрагента, присутній лише для елементів виписки рахунків ФОП');
            table.string('COUNTER_IBAN', 255)
                .comment('IBAN контрагента, присутній лише для елементів виписки рахунків ФОП');
            table.string('COUNTER_NAME', 255)
                .comment('Найменування контрагента');
            table.boolean('HOLD')
                .comment('Статус блокування суми')
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('EXPENSES');
};
