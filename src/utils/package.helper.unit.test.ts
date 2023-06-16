import { readFileSync } from 'node:fs';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import getPackage from './package.helper.js';

jest.mock('node:fs');
jest.spyOn(JSON, 'parse');
const mockedReadFileSync = <jest.Mock<typeof readFileSync>>readFileSync;

describe('getPackage', () => {
    const PACKAGE_JSON_STRING = '{"name": "example", "version": "1.0.0"}';
    const PACKAGE_JSON_VALUE = { name: 'example', version: '1.0.0' };

    beforeEach(() => {
        mockedReadFileSync.mockReturnValue(PACKAGE_JSON_STRING);
    });

    it('should read and parse the package.json file', () => {
        const result = getPackage();

        expect(readFileSync).toHaveBeenCalledWith('./package.json', { encoding: 'utf-8' });
        expect(JSON.parse).toHaveBeenCalledWith(PACKAGE_JSON_STRING);
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
