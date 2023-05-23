export interface Statement {
    // Унікальний id транзакції
    id: string;
    // Час транзакції в секундах в форматі Unix time
    time: number;
    // Опис транзакцій
    description: string;
    // Код типу транзакції (Merchant Category Code), відповідно ISO 18245
    mcc: number;
    // Оригінальний код типу транзакції (Merchant Category Code), відповідно ISO 18245
    originalMcc: number;
    // Статус блокування суми
    hold: boolean;
    // Сума у валюті рахунку в мінімальних одиницях валюти (копійках, центах)
    amount: number;
    // Сума у валюті транзакції в мінімальних одиницях валюти (копійках, центах)
    operationAmount: number;
    // Код валюти рахунку відповідно ISO 4217
    currencyCode: number;
    // Розмір комісії в мінімальних одиницях валюти (копійках, центах)
    commissionRate: number;
    // Розмір кешбеку в мінімальних одиницях валюти (копійках, центах)
    cashbackAmount: number;
    // Баланс рахунку в мінімальних одиницях валюти (копійках, центах)
    balance: number;
    // Коментар до переказу, уведений користувачем. Якщо не вказаний, поле буде відсутнім
    comment: string;
    // Номер квитанції для check.gov.ua. Поле може бути відсутнім
    receiptId: string;
    // Номер квитанції ФОПа, приходить у випадку якщо це операція із зарахуванням коштів
    invoiceId: string;
    // ЄДРПОУ контрагента, присутній лише для елементів виписки рахунків ФОП
    counterEdrpou: string;
    // IBAN контрагента, присутній лише для елементів виписки рахунків ФОП
    counterIban: string;
    // Найменування контрагента
    counterName: string;
}
