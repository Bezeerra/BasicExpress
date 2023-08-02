import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUsersRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    
    constructor(private readonly updateUserRepository: IUpdateUsersRepository){}

    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
        try{
            const id = httpRequest?.params?.id;

            if (!id) {
                return {
                    statusCode: 422,
                    body: "Missing user id"
                }
            }
            if (!httpRequest.body){
                return {
                    statusCode: 422,
                    body: "You need pass a body"
                }
            }

            const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = ["firstName", "lastName", "password"];
            const someFieldIsNotAllowedToUpdate = Object.keys(httpRequest.body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
            );

            if (someFieldIsNotAllowedToUpdate){
                return {
                    statusCode: 422,
                    body: "Body canot process"
                }
            }
            const user = await this.updateUserRepository.updateUser(id, httpRequest.body!)
        
            return {
                statusCode: 200,
                body: user
            }

        }catch (error){
            return {
                statusCode: 500,
                body: "Internal server error"
            }
        }
    }
}