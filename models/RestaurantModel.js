"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
//Imports
var mongoose_1 = require("mongoose");
var DbConnection_1 = require("../DbConnection");
//Mongoose connections and object
var mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
var mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
var RestaurantModel = /** @class */ (function () {
    //constructor initilize the create schema and model
    function RestaurantModel() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for restaurants
    RestaurantModel.prototype.createSchema = function () {
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
    };
    //function to create model for the reataurant interface and schema
    RestaurantModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("restaurant", this.schema);
    };
    return RestaurantModel;
}());
exports.RestaurantModel = RestaurantModel;
