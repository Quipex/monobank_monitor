import { Statement } from './model/Statement';
import { UserInfo } from './model/UserInfo';
import { ENDPOINTS } from './endpoints';
import axios, { AxiosPromise } from "axios"
import { env } from "../../env"

const _call = (endpoint: string, cardIndex = '1') => axios({
    method: 'get',
    url: `https://api.monobank.ua/${endpoint}`,
    headers: {
        'X-Token': env.app.monobank_tokens[+cardIndex - 1]
    }
})

export function clientInfo(cardIndex?: string): AxiosPromise<UserInfo> {
    return _call(ENDPOINTS.PERSONAL_INFO, cardIndex);
}

const toUnix = (date: string) => (new Date(date).getTime() / 1000).toString()

export function searchStatement(from: string, to?: string, cardIndex?: string): AxiosPromise<Statement[]> {
    const _from = toUnix(from);
    const _to = to ? toUnix(to) : '';
    return _call(ENDPOINTS.PERSONAL_STATEMENT(env.app.monobank_cards[+cardIndex - 1], _from, _to), cardIndex);
}
