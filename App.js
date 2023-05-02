"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
//Imports
const RestaurantModel_1 = require("./models/RestaurantModel");
const MenuModel_1 = require("./models/MenuModel");
const MenuItemsModel_1 = require("./models/MenuItemsModel");
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const OrderModel_1 = require("./models/OrderModel");
// Class App which creates and configure the express application
class App {
    // Constructor which runs the configuration on the express application and calls the routes function
    constructor() {
        this.expressApp = express();
        this.Restaurants = new RestaurantModel_1.RestaurantModel();
        this.Menu = new MenuModel_1.MenuModel();
        this.MenuItems = new MenuItemsModel_1.MenuItemsModel();
        this.Orders = new OrderModel_1.OrderModel();
        this.middleware();
        this.routes();
    }
    // Configure the middleware of express application
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(express.static('pages'));
    }
    // Api Endpoints....
    routes() {
        let router = express.Router();
        // Retrieve all the restaurant endpoint
        router.get("/restaurants", (req, res) => {
            console.log("Query all the restaurants");
            this.Restaurants.retrieveAllRestaurants(res);
        });
        // Retrieve specific restaurant details
        router.get('/restaurants/:id', (req, res) => {
            let id = req.params.id;
            console.log('Query single restaurant with id: ' + id);
            this.Restaurants.getRestaurantDetailsById(res, { id: id });
        });
        // Retrieve Menu
        router.get("/restaurant/:restaurantId/menu", (req, res) => {
            var restaurantId = req.params.restaurantId;
            console.log("Query single menu with restid: " + restaurantId);
            this.Menu.retrieveMenu(res, { restaurantId: restaurantId });
        });
        // Retrieve Menu Items
        router.get("/restaurant/:restaurantId/menu/:menuId", (req, res) => {
            var restaurantId = req.params.restaurantId;
            var menuId = req.params.menuId;
            console.log("Query single menu with restid: " + restaurantId);
            this.MenuItems.retrieveMenuItems(res, {
                menuId: menuId,
                restaurantId: restaurantId,
            });
        });
        // Routing post order requests to save data
        router.post("/orders", (request, response) => {
            this.Orders.createOrder(request, response);
        });
        this.expressApp.use("/", router);
    }
}
exports.App = App;
