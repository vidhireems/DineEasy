//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IUserModel } from '../interfaces/IUserModel';
const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from "uuid";

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class UserModel {
    public schema:any;
    public model:any;

    //constructor initilize the create schema and model
    public constructor() {
        this.createSchema();
        this.createModel();
    }

    //function to create the schema for restaurants
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                id: String,
                name: String,
                email: String,
                Password: String,
                User_Type: String,
                Refrence_User_Type_Id: String,
            }, {collection: 'Users'}
        );
    }

    //function to create model for the User interface and schema
    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("Users", this.schema);
    }
    
    // function for retriving specific user
    public async retrieveUser(response:any, filter:Object): Promise<any> {

        try {
            const query = this.model.findOne(filter);
            query.then((UserDetail:any) => {
                if (!UserDetail) {
                    console.error({ error: "Unable to find User"});
                    response.status(404).send({ error: "User not found"});
                } else {
                    response.send(UserDetail);
                }});
        }catch(err) {
            console.error(err);
               response.sendStatus(500).send({ message: "Internal server error while retrieving User detail" });
        }
    }
    //login user
    //logout user
    // delete user will delete all the items related to that user
    // add new user
    public async createCustomerUser(request: any, response: any): Promise<any> {
        // create customer user first and thancome here to make a user
      }
    //hashing password before storage
    
}

export {UserModel};