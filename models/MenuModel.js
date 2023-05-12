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
exports.MenuModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
const uuid_1 = require("uuid");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for menu model
class MenuModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for Menu
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            resId: String,
            menuId: String,
            name: String
        }, { collection: 'menu' });
    }
    // function for creating model
    createModel() {
        this.model = mongooseConnection.model("menu", this.schema);
    }
    // function for retrieving all the Menu in a restaurant
    retrieveMenu(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemArray = yield this.model.find(filter).exec();
                if (itemArray.length == 0) {
                    response.sendStatus(404);
                }
                else {
                    response.json(itemArray);
                }
            }
            catch (err) {
                console.error(err);
                response.sendStatus(500);
            }
        });
    }
    // add new menu
    createMenu(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuId = (0, uuid_1.v4)();
                const { resId } = request.params;
                const { name } = request.body;
                if (!resId || !name) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                //TODO: Check if the restaurant is actaullt present
                const restaurant = new this.model({
                    resId,
                    menuId,
                    name
                });
                yield restaurant.save();
                response.status(200).json({
                    message: "Menu created successfully!",
                    restaurant: {
                        menuId,
                        resId,
                        name
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
    // Delete a menu
    deleteMenu(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId, menuId } = request.params;
                if (!resId || !menuId) {
                    return response.status(400).json({ message: "Invalid request body" });
                }
                const result = yield this.model.deleteMany({ resId, menuId });
                if (result.deletedCount === 0) {
                    response.status(404).json({ message: "Menu not found!" });
                }
                else {
                    response.status(200).json({ message: "Menu deleted successfully!" });
                }
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting menu items" });
            }
        });
    }
    // Delete all menu items for a restaurant
    deleteAllMenuForRestaurant(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId } = request.params;
                if (!resId) {
                    return response.status(400).json({ message: "Invalid request body" });
                }
                const result = yield this.model.deleteMany({ resId });
                next();
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting menu items for restaurant" });
            }
        });
    }
}
exports.MenuModel = MenuModel;
