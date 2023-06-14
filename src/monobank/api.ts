import axios, { AxiosPromise } from 'axios';

import env from '#utils/env.js';
import { toUnixTime } from '#utils/time.helper.js';
import { ENDPOINTS } from './endpoints.js';
import { Statement } from './model/Statement.js';
import { UserInfo } from './model/UserInfo.js';

const _call = (endpoint: string, cardIndex = '1') => axios({
    method: 'get',
    url: `https://api.monobank.ua/${endpoint}`,
    headers: {
        'X-Token': env.app.monobank_tokens[+cardIndex - 1]
    }
});

export function clientInfo(cardIndex?: string): AxiosPromise<UserInfo> {
    return _call(ENDPOINTS.PERSONAL_INFO, cardIndex);
}

export function searchStatement(from: string, to?: string, cardIndex?: string): AxiosPromise<Statement[]> {
    const _from = toUnixTime(from);
    const _to = to ? toUnixTime(to) : '';
    return _call(ENDPOINTS.PERSONAL_STATEMENT(env.app.monobank_cards[+cardIndex - 1], _from, _to), cardIndex);
}
