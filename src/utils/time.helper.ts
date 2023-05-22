const toUnixTime = (date: string) => (new Date(date).getTime() / 1000).toString();

export { toUnixTime };
