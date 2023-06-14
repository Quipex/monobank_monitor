import { Account } from './Account.js';

export interface UserInfo {
    id: string;
    name: string;
    webHookUrl: string;
    accounts: Account[];
}
