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
                userId: String,
                name: String,
                email: String,
                password: String,
                userType: String,
                refrenceUserTypeId: String,
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
    public async createCustomerUser(data:any): Promise<any> {
        try {
            //create uuid
            const userId = uuidv4();
            // Extract the required data from the 'data' parameter
            const {referenceCustomerTypeId, userType, name, email, password} = data;
        
            // Perform the logic to create a user based on the provided data
            const newUser = new this.model({
                userId,
                name,
                email,
                password,
                userType,
                referenceCustomerTypeId
            });
            await newUser.save();
            return { message: "User Created successfully" };
        } catch (error) {
            console.error("Error Creating User:", error);
            throw new Error("Error Creating User");
        }
    }
    //update user (password, email)
    public async updateCustomerUser(data:any): Promise<any>{

        //find the user using the refrence user type id and update the information
        try {
            // Extract the required data from the 'data' parameter
            const {referenceCustomerTypeId, name, email, password} = data;
            //perform logic to find and update
            //start working here
            const updateUser = await this.model.findOneAndUpdate(
                {referenceCustomerTypeId},
                {email, password,name},
                {new: true}
            );
            return { message: "User Updated Successfully" };
        } catch (error) {
            console.error("Error Updating User:", error);
            throw new Error("Error Updating User");
        }
    }
    //hashing password before storage
    
}

export {UserModel};