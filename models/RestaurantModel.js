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
// Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
// Class for restaurant model
class RestaurantModel {
    // Constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    // Function to create the schema for restaurants
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
    // Function to create model for the reataurant interface and schema
    createModel() {
        if (!mongooseConnection.models.Restaurant) {
            this.model = mongooseConnection.model("Restaurant", this.schema);
        }
        else {
            this.model = mongooseConnection.models.Restaurant;
        }
    }
    // Function for retrieving all the restaurants(have to use promise after mongoose version 6)
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
    // Function for retrieving restaurant specific information 
    getRestaurantDetailsById(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantdetail = yield this.model.findOne(filter);
                if (!restaurantdetail) {
                    console.error({ error: "Unable to find the Restaurant" });
                    response.status(404).json({ error: "Restaurant not found" });
                }
                else {
                    response.json(restaurantdetail);
                }
            }
            catch (err) {
                console.error(err);
                response.status(500).json({ message: "Internal server error while retrieving restaurant details" });
            }
        });
    }
    // Delete specific restaurant
    deleteRestaurant(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resId = request.params.resId;
                const result = yield this.model.deleteOne({ resId: resId });
                if (result.deletedCount === 1) {
                    response.status(200).json({ message: `Restaurant deleted successfully` });
                }
                else {
                    response.status(404).json({ message: `Restaurant not found` });
                }
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting restaurant" });
            }
        });
    }
    // Add new restaurant
    createRestaurant(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resId = (0, uuid_1.v4)();
                console.log("in model");
                console.log(request.body);
                const { name, image, location, rating, reviews, cost, cuisines, contact, neighborhood, hours, parkingdetails, isValetPark, numberOfTables } = request.body;
                if (!name || !image || !location || !rating || !reviews || !cost || !cuisines || !contact || !neighborhood || !hours || !parkingdetails || !numberOfTables) {
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
                    message: "Restaurant created succcessfully!",
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
            }
            catch (error) {
                console.error(error);
                console.log(error);
                response.sendStatus(500);
            }
        });
    }
    // Update restaurant 
    updateRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resId = req.params.resId;
                console.log(req.body);
                const { name, image, location, rating, reviews, cost, cuisines, contact, neighborhood, hours, parkingdetails, isValetPark, numberOfTables } = req.body;
                if (!name || !image || !location || !rating || !reviews || !cost || !cuisines || !contact || !neighborhood || !hours || !parkingdetails || !numberOfTables) {
                    return res.status(400).json({ message: "Please fill all fields" });
                }
                const updatedRestaurant = yield this.model.findOneAndUpdate({ resId }, {
                    $set: {
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
                }, { new: true });
                if (!updatedRestaurant) {
                    return res.status(404).json({ message: "Restaurant not found" });
                }
                res.status(200).json({
                    message: "Restaurant updated successfully",
                    restaurant: updatedRestaurant,
                });
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    }
}
exports.RestaurantModel = RestaurantModel;
