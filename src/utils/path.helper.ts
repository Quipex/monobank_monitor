function getOsEnv(key: string): string {
    return process.env[key] ?? '';
}

function getOsEnvArray(key: string, delimiter = ','): string[] {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
}

export {
    getOsEnv,
    getOsEnvArray
};
