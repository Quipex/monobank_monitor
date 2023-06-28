import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import getPackage from './package.helper.js';

vi.mock('node:fs', () => {
    const PACKAGE_JSON_STRING = '{"name": "example", "version": "1.0.0"}';
    const readFileSyncMock = vi.fn().mockReturnValue(PACKAGE_JSON_STRING);
    return { readFileSync: readFileSyncMock };
});
const PACKAGE_JSON_VALUE = { name: 'example', version: '1.0.0' };

vi.spyOn(JSON, 'parse');

describe('getPackage', () => {
    it('should read and parse the package.json file', () => {
        const result = getPackage();

        expect(readFileSync).toHaveBeenCalledWith('./package.json', { encoding: 'utf-8' });
        expect(result).toEqual(PACKAGE_JSON_VALUE);
    });

    it('should cache and return the parsed package.json content', () => {
        const result1 = getPackage();
        const result2 = getPackage();

        expect(readFileSync).toHaveBeenCalledTimes(1);
        expect(JSON.parse).toHaveBeenCalledTimes(1);
        expect(result1).toEqual(PACKAGE_JSON_VALUE);
        expect(result2).toEqual(PACKAGE_JSON_VALUE);
    });
});
