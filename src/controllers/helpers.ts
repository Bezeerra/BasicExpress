
export const ok = (body: unknown) => {
    return {
        statusCode: 200, 
        body: body
    }
}


export const badRequest = (message: string) => {
    return {
        statusCode: 500,
        body: message
    }
}