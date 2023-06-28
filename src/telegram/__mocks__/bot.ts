import { vi } from 'vitest';

import bot from '../bot.js';

const botMock = vi.fn(bot);

botMock.mockReturnValue({
    telegram: {
        sendMessage: vi.fn(),
    }
} as any);

export default botMock;
