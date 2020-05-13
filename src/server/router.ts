import * as Hapi from '@hapi/hapi';
import UserRoutes from './api/users/routes';
import logger from './helper/logger';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        logger.info('Router - Start adding routes');

        await new UserRoutes().register(server);

        logger.info('Router - Finish adding routes');
    }
}
