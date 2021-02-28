import { format, createLogger, transports } from "winston";

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
const commonFormats = [
    enumerateErrorFormat(),
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level}]: ${message}`)
]

const logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                ...commonFormats
            )
        }),
        new transports.File({
            format: format.combine(...commonFormats),
            filename: 'full.log'
        })
    ],
});

export default logger;
