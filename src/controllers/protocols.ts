export interface HttpResponse<T>{  // recebendo o body como um generic
    statusCode: number;
    body: T | string;
}


export interface HttpRequest<B> {
    body?: B,
    params?: any,
    headers?: any,
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
} 

export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
    WRONG_SCHEMA = 422
}