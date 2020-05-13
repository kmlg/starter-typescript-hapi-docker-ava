import * as Hapi from '@hapi/hapi';

import logger from '../helper/logger';
import Server from '../server';

export interface IPayload<T> {
    status: number;
    data: T;
}

class TestEnvironment {
    
    public meta: any = [];

    public start(): Promise<Hapi.Server> {
        logger.info('Starting test environment');
        if (Server.instance() === undefined) {
            return Server.start();
        }
        return Server.recycle();
    }
    
    public async stop(): Promise<any> {
        await Server.stop();
    }

    public stopServer() {
        this.stop();
    }

    public inject(request: Hapi.ServerInjectOptions): Promise<Hapi.Server> {
        return Server.inject(request);
    }
}

const currentTestEnvironment = new TestEnvironment();

export const server = currentTestEnvironment;

export const extractPayload = <T>(response: Hapi.ServerInjectResponse): IPayload<T> => {
    const payload = JSON.parse(response.payload) as IPayload<T>;

    return payload;
};