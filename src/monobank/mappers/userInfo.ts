import { accountToString } from './account.js';

import { UserInfo } from '../model/UserInfo.js';

export const infoToString = ({ id, name, webHookUrl, accounts }: UserInfo) => {
    let message = id !== undefined
                  ? `${name} '${id}'\n`
                  : `${name}\n`;
    if (webHookUrl) message += `webhook: '${webHookUrl}'\n`;
    message += `Карты:\n${accounts.map(ac => accountToString(ac)).join('\n')}`;
    return message;
};
