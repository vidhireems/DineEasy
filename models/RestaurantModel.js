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
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
class RestaurantModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
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
    createModel() {
        this.model = mongooseConnection.model("restaurant", this.schema);
    }
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
}
exports.RestaurantModel = RestaurantModel;
