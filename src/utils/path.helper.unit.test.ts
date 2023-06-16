import { describe, expect, it } from '@jest/globals';

import { getOsEnv, getOsEnvArray } from './path.helper.js';

describe('getOsEnv', () => {
    it('should return the value of the specified environment variable', () => {
        process.env.TEST_ENV_VAR = 'test-value';
        const result = getOsEnv('TEST_ENV_VAR');
        expect(result).toBe('test-value');
    });

    it('should return an empty string if the environment variable is not set', () => {
        const result = getOsEnv('NON_EXISTING_VAR');
        expect(result).toBe('');
    });
});


describe('getOsEnvArray', () => {
    it('should return an array of environment variable values split by the delimiter', () => {
        process.env.TEST_ENV_VAR = 'value1,value2,value3';
        const result = getOsEnvArray('TEST_ENV_VAR', ',');
        expect(result).toEqual(['value1', 'value2', 'value3']);
    });

    it('should return an empty array if the environment variable is not set', () => {
        const result = getOsEnvArray('NON_EXISTING_VAR');
        expect(result).toEqual([]);
    });

    it('should split the value using a comma as the default delimiter if no delimiter is provided', () => {
        process.env.TEST_ENV_VAR = 'value1,value2,value3';
        const result = getOsEnvArray('TEST_ENV_VAR');
        expect(result).toEqual(['value1', 'value2', 'value3']);
    });
});
