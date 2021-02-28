import { Statement } from './model/Statement';
import { UserInfo } from './model/UserInfo';
import { ENDPOINTS } from './endpoints';
import axios, { AxiosPromise } from "axios"
import { env } from "../../env"

const call = (endpoint: string) => axios({
    method: 'get',
    url: `https://api.monobank.ua/${endpoint}`,
    headers: {
        'X-Token': env.app.monobank_token
    }
})

export function clientInfo(): AxiosPromise<UserInfo> {
    return call(ENDPOINTS.PERSONAL_INFO);
}

const toUnix = (date: string) => (new Date(date).getTime() / 1000).toString()

export function searchStatement(account: string, from: string, to?: string): AxiosPromise<Statement[]> {
    const _from = toUnix(from);
    const _to = to ? toUnix(to) : '';
    return call(ENDPOINTS.PERSONAL_STATEMENT(account, _from, _to))
}
