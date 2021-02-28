export const ENDPOINTS = {
    CURRENCY: '/bank/currency',
    PERSONAL_INFO: '/personal/client-info',
    PERSONAL_STATEMENT: (account: string, from: string, to: string) => `/personal/statement/${account}/${from}/${to}`
}