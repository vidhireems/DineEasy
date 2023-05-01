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
exports.RestaurantModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
class RestaurantModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for restaurants
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            id: Number,
            name: String,
            image: String,
            location: String,
            rating: Number,
            reviews: Number,
            cost: String,
            cuisines: String,
            contact: String,
            neighborhood: String,
            hours: String,
            parkingdetails: String,
            isValetPark: Boolean,
            numberOfTables: Number,
        }, { collection: 'restaurant' });
    }
    //function to create model for the reataurant interface and schema
    createModel() {
        this.model = mongooseConnection.model("restaurant", this.schema);
    }
    // function for retriving all the restaurants(have to use promise after mongoose version 6)
    retrieveAllRestaurants(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemArray = yield this.model.find().exec();
                response.json(itemArray);
            }
            catch (err) {
                console.error(err);
                response.sendStatus(500);
            }
        });
    }
    // public async retrieveRestaurantDetails(response:any, filter:Object): Promise<any> {
    //     const query = this.model.find(filter);
    //     query.then((result:any) => {
    //         response.send(result);
    //     }).catch((err:any) => {
    //         console.error({ error: "Unable to Find the Restaurant with id" });
    //         response.status(404).send({ error: 'Unable to Find the Restaurant with id' }); 
    // });
    retrieveRestaurantDetails(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find(filter);
            query.then((result) => {
                if (result.length === 0) {
                    console.error({ error: "Unable to find the Restaurant", });
                    response.status(404).send({ error: "Unable to find the Restaurant" });
                }
                else {
                    response.send(result);
                }
            }).catch((err) => {
                console.error(err);
                response.status(500).send({ error: err });
            });
        });
    }
}
exports.RestaurantModel = RestaurantModel;
