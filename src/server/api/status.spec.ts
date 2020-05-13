import test from 'ava';
import { server } from './testEnvironment';

test.before(async () => {
    await server.start();
});

test.after(async () => {
    await server.stop();
});

test('GET /status returns 200', async (t) => {
    const request = {
        url: '/status',
        method: 'GET',
        app: {}
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
});
