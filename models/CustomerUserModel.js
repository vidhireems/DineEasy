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
exports.CustomerUserModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
const uuid_1 = require("uuid");
const UserModel_1 = require("./UserModel");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
class CustomerUserModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for restaurants
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            name: { type: String, require: true },
            customerId: { type: String, require: true },
            address: { type: String, require: true },
            contactNumber: { type: String, require: true },
            isCheckedIn: {
                type: Boolean,
                default: false,
            },
            customerType: {
                type: String,
                default: "Freemium",
            },
            refrenceCustomerTypeId: {
                type: String,
                default: "N/A",
            },
        }, { collection: "CustomerUser" });
    }
    //function to create model
    createModel() {
        if (!mongooseConnection.models.CustomerUser) {
            this.model = mongooseConnection.model("CustomerUser", this.schema);
        }
        else {
            this.model = mongooseConnection.models.CustomerUser;
        }
    }
    // function for retriving specific customer
    retrieveCustomer(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.model.findOne(filter);
                query.then((CustomerDetail) => {
                    if (!CustomerDetail) {
                        console.error({ error: "Unable to find Customer" });
                        response.status(404).send({ error: "Customer not found" });
                    }
                    else {
                        response.send(CustomerDetail);
                    }
                });
            }
            catch (err) {
                console.error(err);
                response
                    .sendStatus(500)
                    .send({
                    message: "Internal server error while retrieving Customer detail",
                });
            }
        });
    }
    //add customer
    createCustomer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = (0, uuid_1.v4)();
                console.log(request.body);
                const { address, contactNumber, name, email, password } = request.body;
                if (!address ||
                    !contactNumber ||
                    !name ||
                    !email ||
                    !password ||
                    !customerId) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                //Creating data for createUser
                const userData = {
                    customerId: customerId,
                    userType: "Customer",
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password,
                };
                //sending data to user model to create user
                const userModel = new UserModel_1.UserModel();
                const userResponse = yield userModel.createCustomerUser(userData);
                //check if the user was made in user collection
                if (userResponse.message != "User Created successfully") {
                    response.status(500).json({
                        message: "User not created",
                    });
                }
                console.log("User Created:...");
                const customer = new this.model({
                    customerId,
                    address,
                    contactNumber,
                    isCheckedIn: false,
                    customerType: "Premium",
                    referenceCustomerTypeId: "",
                });
                yield customer.save();
                console.log("Customer Created:...");
                response.status(200).json({
                    message: "Customer Created successfully",
                    customer: {
                        customerId,
                        address,
                        contactNumber,
                        isCheckedIn: false,
                        customerType: "Premium",
                        referenceCustomerTypeId: "",
                    },
                });
            }
            catch (error) {
                response.error(500).json({ message: "Error Creating Customer..." });
            }
        });
    }
    //update customer
    //only update address, contactnumber, email, password
    updateCustomer(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = request.params.customerId;
                const { address, contactNumber, name, email, password } = request.body;
                if (!customerId ||
                    !address ||
                    !contactNumber ||
                    !email ||
                    !password ||
                    !name)
                    return response
                        .status(400)
                        .json({ message: "Please fill all the fields" });
                //find the user and update it in user collection
                const userData = {
                    customerId: customerId,
                    name: name,
                    email: email,
                    password: password,
                };
                const userModel = new UserModel_1.UserModel();
                const userUpdateResponse = yield userModel.updateCustomerUser(userData);
                if (userUpdateResponse.message != "User Updated Successfully") {
                    response.status(500).json({
                        message: "User not Updates",
                    });
                }
                //find the user and update it in customer collection
                const updateCustomer = yield this.model.findOneAndUpdate({ customerId }, { address, contactNumber }, { new: true });
                if (!updateCustomer)
                    return response.status(400).json({ message: "Customer Not found" });
                return response.status(200).json({
                    message: "Customer Updated",
                    customer: updateCustomer,
                });
            }
            catch (error) {
                console.log("Error Updating Customer:...");
                response.status(500).json({ message: "Error Updating Customer" });
            }
        });
    }
}
exports.CustomerUserModel = CustomerUserModel;
