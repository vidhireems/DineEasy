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
exports.MenuItemsModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for menu model
class MenuItemsModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for Menu
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            menuId: String,
            resId: String,
            menu: [
                {
                    category: String,
                    name: String,
                    price: Number,
                    is_veg: Boolean,
                    ingredients: String,
                }
            ]
        }, { collection: 'menuItems' });
    }
    //function for create the model
    createModel() {
        this.model = mongooseConnection.model("menuItems", this.schema);
    }
    // function for retrieving all the menu items in a restaurant menu
    retrieveMenuItems(response, filter) {
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
    // Add menu items
    createMenuItems(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId, menuId } = request.params;
                const { menu } = request.body;
                if (!resId || !menuId || !menu) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                //TODO: If menu id not present in menu db then handle the exception
                let menuItems = yield this.model.findOne({ resId, menuId });
                if (menuItems) {
                    menuItems.menu.push(...menu);
                }
                else {
                    menuItems = new this.model({
                        menuId,
                        resId,
                        menu
                    });
                }
                yield menuItems.save();
                response.status(200).json({
                    message: "Menu items successfully added",
                    menuItems: {
                        menuId,
                        resId,
                        menu
                    },
                });
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while creating menu items" });
            }
        });
    }
    // Delete Menu item
    deleteMenuItems(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId, menuId } = request.params;
                const { names } = request.body;
                if (!resId || !menuId || !names || !Array.isArray(names)) {
                    return response.status(400).json({ message: "Invalid request body" });
                }
                const result = yield this.model.updateOne({ resId, menuId }, {
                    $pull: {
                        menu: {
                            name: { $in: names }
                        }
                    }
                });
                if (result.modifiedCount > 0) {
                    //If all menu items are deleted then also delete the menuitem document and menu document
                    const document = yield this.model.findOne({ resId, menuId });
                    if (document.menu.length === 0) {
                        yield this.model.deleteOne({ resId, menuId });
                    }
                    response.status(200).json({ message: "Menu items deleted successfully" });
                }
                else {
                    response.status(404).json({ message: "Menu not found" });
                }
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting menu items" });
            }
        });
    }
    // Delete all menu items in a menu
    deleteAllMenuItems(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId, menuId } = request.params;
                if (!resId || !menuId) {
                    return response.status(400).json({ message: "Invalid request body" });
                }
                yield this.model.deleteMany({ resId, menuId });
                next();
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting menu items" });
            }
        });
    }
    // Delete all menu items for a restaurant
    deleteAllMenuItemsForRestaurant(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId } = request.params;
                if (!resId) {
                    return response.status(400).json({ message: "Invalid request body" });
                }
                yield this.model.deleteMany({ resId });
                next();
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: "Internal server error while deleting menu items for restaurant" });
            }
        });
    }
    // Update menu item
    updateMenuItems(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resId, menuId } = request.params;
                const { category, name, price, is_veg, ingredients } = request.body;
                if (!resId || !menuId) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                const result = yield this.model.findOneAndUpdate({ resId, menuId }, {
                    $set: {
                        "menu.$[item].category": category,
                        "menu.$[item].name": name,
                        "menu.$[item].price": price,
                        "menu.$[item].is_veg": is_veg,
                        "menu.$[item].ingredients": ingredients,
                    },
                }, {
                    new: true,
                    arrayFilters: [{ "item.name": name }]
                });
                if (!result) {
                    return response.status(404).json({ message: "Menu item not found!" });
                }
                response.status(200).json({
                    message: "Menu item updated successfully",
                    restaurant: result,
                });
            }
            catch (error) {
                console.error(error);
                response.status(500);
            }
        });
    }
}
exports.MenuItemsModel = MenuItemsModel;
