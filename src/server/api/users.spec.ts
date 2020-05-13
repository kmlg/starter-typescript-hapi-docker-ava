import test from 'ava';

import { server } from './testEnvironment';

test.before(async () => {
    await server.start();
});

test.after(async () => {
    await server.stop();
});

test('GET /api/users returns 200', async (t) => {
    const request = {
        url: '/api/users',
        method: 'GET'
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
});

test.serial('POST /api/users returns 200', async (t) => {
    const request = {
        method: 'POST',
        url: '/api/users',
        payload: {
            name: 'Marcus'
        }
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
    t.is(typeof response.result, 'object');
    t.is(response.result.data.length, 1);
    server.meta = response.result.data[0];
});

test.serial('PUT /api/users/<id> returns 200', async (t) => {
    const request = {
        method: 'PUT',
        url: `/api/users/${server.meta._id}`,
        payload: {
            name: 'Marcus updated'
        }
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
    t.is(typeof response.result, 'object');
    t.is(response.result.data.length, 1);
    t.is(typeof response.result.data[0]._id, 'string');
    t.is(response.result.data[0].name, request.payload.name);
});

test.serial('GET /api/users/<id> returns 200', async (t) => {
    const request = {
        url: `/api/users/${server.meta._id}`,
        method: 'GET'
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
});

test.serial('DELETE /api/users/<id> returns 200', async (t) => {
    const request = {
        url: `/api/users/${server.meta._id}`,
        method: 'DELETE'
    };
    const response = await server.inject(request);
    t.is(response.statusCode, 200);
});