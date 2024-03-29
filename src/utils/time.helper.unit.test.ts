import { describe, expect, it } from 'vitest';

import { toUnixTime } from './time.helper.js';

describe('toUnixTime', () => {
    it('should convert valid date string to Unix timestamp', () => {
        const date = '2023-06-17T10:30:00Z';
        const expectedUnixTime = 1686997800;
        expect(toUnixTime(date)).toBe(expectedUnixTime);
    });

    it('should convert another valid date string to Unix timestamp', () => {
        const date = '2023-01-01T00:00:00Z';
        const expectedUnixTime = 1672531200;
        expect(toUnixTime(date)).toBe(expectedUnixTime);
    });

    it('should handle an invalid date string and return NaN', () => {
        const invalidDate = 'Invalid Date';
        expect(toUnixTime(invalidDate)).toBeNaN();
    });
});
