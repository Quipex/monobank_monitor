import { Account } from './Account';

export interface UserInfo {
    id: string;
    name: string;
    webHookUrl: string;
    accounts: Account[];
}
