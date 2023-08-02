import { User } from "../../models/user";

export interface UpdateUserParams { 
    id: string
    lastName?: string,
    firstName?: string,
    email?: string,
    password?: string
}


export interface IUpdateUsersRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

