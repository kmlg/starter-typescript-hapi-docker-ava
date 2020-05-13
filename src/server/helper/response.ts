import * as Hapi from '@hapi/hapi';

interface IResponseMeta {
    readonly operation?: string;
    readonly method?: string;
    readonly paging?: string | null;
}

interface IResponseError {
    readonly code?: string | number;
    readonly message?: string;
    readonly error?: string;
}

interface IResponse<T> {
    readonly meta: IResponseMeta;
    readonly data: readonly T[];
    readonly errors: readonly IResponseError[];
}

interface IResponseOptions<T> {
    readonly value?: T | null | undefined;
    readonly boom?: any | null | undefined;
}

export default function createResponse<T>(
    request: Hapi.Request,
    { value = null, boom = null }: IResponseOptions<T>
): IResponse<T> {
    const errors: any = [];
    const data: any = [];

    if (boom) {
        errors.push({
            code: boom.output.payload.statusCode,
            error: boom.output.payload.error,
            message: boom.output.payload.message
        });
    }

    if (value && data) {
        if (Array.isArray(value)) {
            data.push(...value);
        } else {
            data.push(value);
        }
    }

    return {
        meta: {
            method: request.method.toUpperCase(),
            operation: request.url.pathname,
            paging: null
        },
        data,
        errors
    };
}
