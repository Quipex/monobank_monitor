import { vi } from 'vitest';

import { getOsEnv, getOsEnvArray } from '../path.helper.js';

const getOsEnvMock = vi.fn(getOsEnv);
getOsEnvMock.mockImplementation((key) => {
    switch (key) {
        case 'APP_PORT': {
            return '8787';
        }
        default: {
            return '';
        }
    }
});

const getOsEnvArrayMock = vi.fn(getOsEnvArray);

export {
    getOsEnvMock as getOsEnv,
    getOsEnvArrayMock as getOsEnvArray
};
