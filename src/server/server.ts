import * as Hapi from '@hapi/hapi';
import * as DotEnv from 'dotenv';
import logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

export default class Server {
    private static _instance: Hapi.Server;
    public static async start(): Promise<Hapi.Server> {
        try {
            DotEnv.config({
                path: `${process.cwd()}/.env`
            });

            Server._instance = new Hapi.Server({
                port: process.env.PORT
            });

            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);

            await Server._instance.start();

            logger.info(
                `Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`
            );
            logger.info(
                `Server - Visit http://${process.env.HOST}:${process.env.PORT}/api/users for REST API`
            );
            logger.info(
                `Server - Visit http://${process.env.HOST}:${process.env.PORT}/documentation for Swagger docs`
            );

            return Server._instance;
        } catch (error) {
            logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }

    public static stop(): Promise<Error | void> {
        logger.info(`Server - Stopping execution`);

        return Server._instance.stop();
    }

    public static async recycle(): Promise<Hapi.Server> {
        logger.info(`Server - Recycling instance`);

        await Server.stop();

        return Server.start();
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }

    public static async inject(
        options: string | Hapi.ServerInjectOptions
    ): Promise<Hapi.ServerInjectResponse> {
        return Server._instance.inject(options);
    }
}
