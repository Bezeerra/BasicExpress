
import validator from 'validator';
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {

    constructor(private readonly createUserRepository: ICreateUserRepository){}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            
            const requiredFields = ["firstName", "lastName", "email", "password"];
            
            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`
                    }
                }
            }
4
            const emailIsInvalid = validator.isEmail(httpRequest.body!.email)
            
            if (!emailIsInvalid){
                return {
                    statusCode: 400,
                    body: "Email is invalid"
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!)

            return {
                statusCode: 200,
                body: user
            }
        } catch( error ){
            return {
                statusCode: 500,
                body: "Error on create user"
            }
        }

    }
}