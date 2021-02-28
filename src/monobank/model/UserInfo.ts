import { Account, accountToString } from './Account';

export interface UserInfo {
    id: string;
    name: string;
    webHookUrl: string;
    accounts: Account[];
}

export const infoToString = ({ id, name, webHookUrl, accounts }: UserInfo) => {
    let message = id !== undefined
        ? `${name} '${id}'\n`
        : `${name}\n`
    if (webHookUrl) message += `webhook: '${webHookUrl}'\n`;
    message += `Карты:\n${accounts.map(ac => accountToString(ac)).join('\n')}`;
    return message;
}
