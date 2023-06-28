const toUnixTime = (date: string): number => new Date(date).getTime() / 1000;

export { toUnixTime };
