import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository{
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db
        .collection<Omit<User, "id">>("users")
        .find({})
        .toArray();

        return users?.map((user) => ({
            id: user._id.toHexString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }));

    }

}

// se formos aplicar um movo banco como postgres podemos utilizar da mesma forma
// já que a aplicação está esperando apenas um implements IGetUsersRepository

