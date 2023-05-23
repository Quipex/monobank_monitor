import { env } from "./env";

export function getCardName(cardId: string) {
    const cardNameBy = fn(env.app.monobank_cards);
    return cardNameBy(cardId);
}

function fn(arr: string[]) {
    return function (str: string) {
        const index = arr.indexOf(str);
        return index !== -1
               ? env.app.monobank_token_names[index]
               : `No name token '${str}'`;
    };
}
