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
const uuid_1 = require("uuid");
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
            resId: String,
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
    retrieveRestaurantDetails(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne(filter);
            query.then((restaurantdetail) => {
                if (!restaurantdetail) {
                    console.error({ error: "Unable to find the Restaurant" });
                    response.status(404).send({ error: "Restaurant not found" });
                }
                else {
                    response.send(restaurantdetail);
                }
            }).catch((err) => {
                console.error(err);
                response.status(500).send({ message: "Internal server error while retrieving restaurant detail" });
            });
        });
    }
    // delete restaurant will delete menues and items 
    // add new restaurants
    createRestaurant(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resId = (0, uuid_1.v4)();
                const { name, image, location, rating, reviews, cost, cuisines, contact, neighborhood, hours, parkingdetails, isValetPark, numberOfTables } = request.body;
                if (!name || !image || !location || !rating || !reviews || !cost || !cuisines || !contact || !neighborhood || !hours || !parkingdetails || !isValetPark || !numberOfTables) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                const restaurant = new this.model({
                    resId,
                    name,
                    image,
                    location,
                    rating,
                    reviews,
                    cost,
                    cuisines,
                    contact,
                    neighborhood,
                    hours,
                    parkingdetails,
                    isValetPark,
                    numberOfTables,
                });
                yield restaurant.save();
                response.status(200).json({
                    message: " Congrats",
                    restaurant: {
                        resId,
                        name,
                        image,
                        location,
                        rating,
                        reviews,
                        cost,
                        cuisines,
                        contact,
                        neighborhood,
                        hours,
                        parkingdetails,
                        isValetPark,
                        numberOfTables,
                    },
                });
                // console.log(response);
            }
            catch (error) {
                console.error(error);
                console.log(error);
                response.sendStatus(500);
            }
        });
    }
}
exports.RestaurantModel = RestaurantModel;
