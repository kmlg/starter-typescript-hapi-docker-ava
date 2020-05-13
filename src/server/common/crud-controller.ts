import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import CrudResolver from '../common/base-resolver';
import logger from '../helper/logger';
import newResponse from '../helper/response';

export default class CrudController<T> {
    constructor(
        public id: string = 'id',
        private crudResolver: CrudResolver<T>
    ) {}

    public readonly create = async (
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            logger.info(`POST - ${request.url.href}`);

            const data: any = await this.crudResolver.save(
                request.payload as any
            );

            return toolkit.response(
                newResponse(request, {
                    value: { _id: data._id }
                })
            );
        } catch (error) {
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error)
                })
            );
        }
    }

    public readonly updateById = async (
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            logger.info(`PUT - ${request.url.href}`);

            const id = encodeURIComponent(request.params[this.id]);

            const updatedEntity: T = await this.crudResolver.updateOneById(
                id,
                request.payload
            );

            if (!updatedEntity) {
                return toolkit.response(
                    newResponse(request, {
                        boom: Boom.notFound()
                    })
                );
            }

            return toolkit.response(
                newResponse(request, {
                    value: updatedEntity
                })
            );
        } catch (error) {
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error)
                })
            );
        }
    }

    public readonly getById = async (
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            logger.info(`GET - ${request.url.href}`);

            const id = encodeURIComponent(request.params[this.id]);

            const entity: T = await this.crudResolver.getOneById(id);

            if (!entity) {
                return toolkit.response(
                    newResponse(request, {
                        boom: Boom.notFound()
                    })
                );
            }

            return toolkit.response(
                newResponse(request, {
                    value: entity
                })
            );
        } catch (error) {
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error)
                })
            );
        }
    }

    public readonly getAll = async (
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            logger.info(`GET - ${request.url.href}`);

            const entities: readonly T[] = await this.crudResolver.getAll();

            return toolkit.response(
                newResponse(request, {
                    value: entities
                })
            );
        } catch (error) {
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error)
                })
            );
        }
    }

    public readonly deleteById = async (
        request: Hapi.Request,
        toolkit: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            logger.info(`DELETE - ${request.url.href}`);

            const id = encodeURIComponent(request.params[this.id]);

            await this.crudResolver.deleteOneById(id);

            return toolkit.response(
                newResponse(request, {
                    value: { _id: id }
                })
            );
        } catch (error) {
            return toolkit.response(
                newResponse(request, {
                    boom: Boom.badImplementation(error)
                })
            );
        }
    }
}
