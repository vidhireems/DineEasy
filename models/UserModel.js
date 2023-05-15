"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
const bcrypt = require('bcrypt');
const uuid_1 = require("uuid");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
class UserModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for restaurants
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            userId: String,
            name: String,
            email: String,
            password: String,
            userType: String,
            refrenceUserTypeId: String,
        }, { collection: 'Users' });
    }
    //function to create model for the User interface and schema
    createModel() {
        this.model = mongooseConnection.model("Users", this.schema);
    }
    // function for retriving specific user
    retrieveUser(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.model.findOne(filter);
                query.then((UserDetail) => {
                    if (!UserDetail) {
                        console.error({ error: "Unable to find User" });
                        response.status(404).send({ error: "User not found" });
                    }
                    else {
                        response.send(UserDetail);
                    }
                });
            }
            catch (err) {
                console.error(err);
                response.sendStatus(500).send({ message: "Internal server error while retrieving User detail" });
            }
        });
    }
    //login user
    //logout user
    // delete user will delete all the items related to that user
    // add new user
    createCustomerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //create uuid
                const userId = (0, uuid_1.v4)();
                // Extract the required data from the 'data' parameter
                const { referenceCustomerTypeId, userType, name, email, password } = data;
                // Perform the logic to create a user based on the provided data
                const newUser = new this.model({
                    userId,
                    name,
                    email,
                    password,
                    userType,
                    referenceCustomerTypeId
                });
                yield newUser.save();
                return { message: "User Created successfully" };
            }
            catch (error) {
                console.error("Error Creating User:", error);
                throw new Error("Error Creating User");
            }
        });
    }
    //update user (password, email)
    updateCustomerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //find the user using the refrence user type id and update the information
            try {
                // Extract the required data from the 'data' parameter
                const { referenceCustomerTypeId, name, email, password } = data;
                //perform logic to find and update
                //start working here
                const updateUser = yield this.model.findOneAndUpdate({ referenceCustomerTypeId }, { email, password, name }, { new: true });
                return { message: "User Updated Successfully" };
            }
            catch (error) {
                console.error("Error Updating User:", error);
                throw new Error("Error Updating User");
            }
        });
    }
}
exports.UserModel = UserModel;
