export const ENDPOINTS = {
    CURRENCY: 'bank/currency',
    PERSONAL_INFO: 'personal/client-info',
    PERSONAL_STATEMENT: function personalStatementUrl(account: string, from: string, to: string) {
        return `personal/statement/${account}/${from}/${to}`;
    }
};
