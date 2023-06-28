// noinspection ES6PreferShortImport

import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { WebhookEvent } from '../../src/monobank/model/WebhookEvent.js';
import { app, launchServer } from '../../src/server/server.js';

vi.mock('#src/utils/path.helper.js');
vi.mock('../../src/telegram/bot.js');

describe('Integration Tests', () => {
    let server;
    beforeAll(() => {
        server = launchServer();
    });

    afterAll(() => {
        server.close();
    });

    it('GET /monobank should return 200 status code', async () => {
        const response = await request(app).get('/monobank');
        expect(response.status).toBe(200);
    });

    it('POST /monobank should return 200 status code', async () => {
        const data = {
            data: {
                account: '', statementItem: {}
            }
        } as WebhookEvent;
        const response = await request(app)
            .post('/monobank')
            .send(data);
        expect(response.status).toBe(200);
    });

    // Add more test cases as needed
});
