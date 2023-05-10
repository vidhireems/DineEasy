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
            id: String,
            address: String,
            contactNumber: String,
            isCheckedIn: Boolean,
            customerType: String,
            refrenceCustomerTypeId: String,
        }, { collection: 'CustomerUser' });
    }
    //function to create model 
    createModel() {
        this.model = mongooseConnection.model("CustomerUser", this.schema);
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
                response.sendStatus(500).send({ message: "Internal server error while retrieving Customer detail" });
            }
        });
    }
}
exports.CustomerUserModel = CustomerUserModel;
