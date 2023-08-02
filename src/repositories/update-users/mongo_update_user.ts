import { ObjectId } from "mongodb";
import { IUpdateUsersRepository } from "../../controllers/update-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";


export class MongoUpdateUserRepository implements IUpdateUsersRepository {

    async updateUser(id: string, params: User): Promise<User> {

        const { upsertedId } = await MongoClient.db
        .collection<Omit<User, "id">>("users")
        .updateOne({_id: new ObjectId(id)}, {$set: {...params}}, {upsert: true});  

        const user = await MongoClient.db
        .collection<Omit<User, "id">>("users")
        .findOne({_id: upsertedId!})

        if(!user){
            throw new Error("User Not Updated");
        }

        const {_id, ...rest} = user;
        return {id: _id.toHexString(), ...rest} ;
    }
}