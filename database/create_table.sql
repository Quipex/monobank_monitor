CREATE TABLE EXPENSES
(
    TRANSACTION_ID   VARCHAR2(50),
    UNIX_TIME        NUMBER(19),
    DESCRIPTION      NVARCHAR2(4000),
    MCC              NUMBER(10),
    ORIGINAL_MCC     NUMBER(10),
    AMOUNT           NUMBER(19),
    OPERATION_AMOUNT NUMBER(19),
    CURRENCY_CODE    NUMBER(10),
    COMMISSION_RATE  NUMBER(19),
    CASHBACK_AMOUNT  NUMBER(19),
    BALANCE          NUMBER(19),
    SENDERS_COMMENT  NUMBER(10),
    RECEIPT_ID       VARCHAR2(100),
    INVOICE_ID       VARCHAR2(100),
    COUNTER_EDRPOU   VARCHAR2(100),
    COUNTER_IBAN     VARCHAR2(100),
    COUNTER_NAME     VARCHAR2(100)
)
    /

COMMENT ON COLUMN EXPENSES.UNIX_TIME IS 'seconds, unix time'
/

COMMENT ON COLUMN EXPENSES.MCC IS 'Код типу транзакції (Merchant Category Code), відповідно ISO 18245'
/

COMMENT ON COLUMN EXPENSES.ORIGINAL_MCC IS 'Оригінальний код типу транзакції (Merchant Category Code), відповідно ISO 18245'
/

COMMENT ON COLUMN EXPENSES.AMOUNT IS 'Сума у валюті рахунку в мінімальних одиницях валюти (копійках, центах)'
/

COMMENT ON COLUMN EXPENSES.OPERATION_AMOUNT IS 'транзакції'
/

COMMENT ON COLUMN EXPENSES.CURRENCY_CODE IS 'Код валюти рахунку відповідно ISO 4217'
/

COMMENT ON COLUMN EXPENSES.COMMISSION_RATE IS 'Розмір комісії в мінімальних одиницях валюти (копійках, центах)'
/

COMMENT ON COLUMN EXPENSES.CASHBACK_AMOUNT IS 'Розмір кешбеку в мінімальних одиницях валюти (копійках, центах)'
/

COMMENT ON COLUMN EXPENSES.BALANCE IS 'Баланс рахунку в мінімальних одиницях валюти (копійках, центах)'
/

COMMENT ON COLUMN EXPENSES.SENDERS_COMMENT IS 'Коментар до переказу, уведений користувачем. Якщо не вказаний, поле буде відсутнім'
/

COMMENT ON COLUMN EXPENSES.RECEIPT_ID IS 'Номер квитанції для check.gov.ua. Поле може бути відсутнім'
/

COMMENT ON COLUMN EXPENSES.INVOICE_ID IS 'Номер квитанції ФОПа, приходить у випадку якщо це операція із зарахуванням коштів'
/

COMMENT ON COLUMN EXPENSES.COUNTER_EDRPOU IS 'ЄДРПОУ контрагента, присутній лише для елементів виписки рахунків ФОП'
/

COMMENT ON COLUMN EXPENSES.COUNTER_IBAN IS 'IBAN контрагента, присутній лише для елементів виписки рахунків ФОП'
/

COMMENT ON COLUMN EXPENSES.COUNTER_NAME IS 'Найменування контрагента'
/
