import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";


export class DeleteUserController implements IController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository){}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<string>> {
        console.log("params", httpRequest.params)
        const id = httpRequest.params?.id;
        if(!id){
            return {
                statusCode: 422,
                body: "Need to pass a id to delete"
            }
        }

        try{
            await this.deleteUserRepository.deleteUser(id)
            return {
                statusCode: 200,
                body: "User deleted"
            }
        }catch (error){
            return {
                statusCode: 500,
                body: "Internal server error"
            }
        }
    }
}