// hook to get modify end restart application
import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get_users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo_get_users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-users/mongo_create_user";
import { CreateUserController } from "./controllers/create-users/create_users";
import { MongoUpdateUserRepository } from "./repositories/update-users/mongo_update_user";
import { UpdateUserController } from "./controllers/update-users/update_user";
import { MongoDeleteUserRepository } from "./repositories/delete-users/mongo_delete_user";
import { DeleteUserController } from "./controllers/delete-users/delete_users";


const main = async () => {
    config();                                                                               
    const app = express();
    const port = process.env.PORT || 8001
    app.use(express.json());
    await MongoClient.connect();

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
    
        const { body, statusCode }=  await getUsersController.handle()
        res.status(statusCode).send(body);
    })

    app.post("/users/create", async (req, res) => {

        const mongoCreateUserRepository = new MongoCreateUserRepository()
        const createUserController = new CreateUserController(mongoCreateUserRepository);
        const { body, statusCode } = await createUserController.handle({
            body: req.body
        });
        res.status(statusCode).send(body);
    })
    // app.patch
    app.post("/users/update/:id", async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();
        const updateUserController = new UpdateUserController(mongoUpdateUserRepository);
        const {body, statusCode} = await updateUserController.handle({
            body: req.body, params: req.params
        });
        res.status(statusCode).send(body);
    })

    app.delete("/users/delete/:id", async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository();
        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);
        const {body, statusCode} = await deleteUserController.handle({
            body: req.body, params: req.params
        });
        res.status(statusCode).send(body);
    });
    
    app.listen(port, () => console.log(`Start Application ${port}`));
}



main();

