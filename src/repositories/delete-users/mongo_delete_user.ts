import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/delete-users/protocols";
import { MongoClient } from "../../database/mongo";



export class MongoDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(id: string): Promise<string> {
        const { deletedCount } = await MongoClient.db.collection("users").deleteOne({_id: new ObjectId(id)})
        
        if (!deletedCount){
            throw "Error on delete user"
        }

        return "Deleted Sucessufully"
    }
}