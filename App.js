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
const CustomerUserModel_1 = require("./models/CustomerUserModel");
// Class App which creates and configure the express application
class App {
    // Constructor which runs the configuration on the express application and calls the routes function
    constructor() {
        this.expressApp = express();
        this.Restaurants = new RestaurantModel_1.RestaurantModel();
        this.Menu = new MenuModel_1.MenuModel();
        this.MenuItems = new MenuItemsModel_1.MenuItemsModel();
        this.Orders = new OrderModel_1.OrderModel();
        this.Customer = new CustomerUserModel_1.CustomerUserModel();
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
        router.get('/restaurants/:resId', (req, res) => {
            let resId = req.params.resId;
            console.log('Query single restaurant with id: ' + resId);
            this.Restaurants.getRestaurantDetailsById(res, { resId: resId });
        });
        // Routing post order requests to save data
        //Create restaurant 
        router.post("/restaurants", (request, response) => {
            this.Restaurants.createRestaurant(request, response);
        });
        //Delete Restaurant
        router.delete("/restaurants/:resId", (req, res) => {
            this.MenuItems.deleteAllMenuItemsForRestaurant(req, res, () => {
                this.Menu.deleteAllMenuForRestaurant(req, res, () => {
                    this.Restaurants.deleteRestaurant(req, res);
                });
            });
        });
        //Update restaurant 
        router.put("/restaurants/:resId", (req, res) => {
            this.Restaurants.updateRestaurant(req, res);
        });
        //Retrieve Menu
        router.get("/restaurants/:resId/menu", (req, res) => {
            var resId = req.params.resId;
            console.log("Query single menu with restid: " + resId);
            this.Menu.retrieveMenu(res, { resId: resId });
        });
        //Create menu
        router.post("/restaurants/:resId/menu", (req, res) => {
            this.Menu.createMenu(req, res);
        });
        //Delete menu
        router.delete("/restaurants/:resId/menu/:menuId", (req, res) => {
            this.MenuItems.deleteAllMenuItems(req, res, () => {
                this.Menu.deleteMenu(req, res);
            });
        });
        //Retrieve Menu Items
        router.get("/restaurants/:resId/menu/:menuId/items", (req, res) => {
            var resId = req.params.resId;
            var menuId = req.params.menuId;
            console.log("Query single menu with restid: " + resId);
            this.MenuItems.retrieveMenuItems(res, {
                menuId: menuId,
                resId: resId,
            });
        });

        // post- createorder

        // Create menu Items
        router.post("/restaurants/:resId/menu/:menuId/items", (req, res) => {
            this.MenuItems.createMenuItems(req, res);
        });
        // Delete menu Items
        router.delete("/restaurants/:resId/menu/:menuId/items", (req, res) => {
            this.MenuItems.deleteMenuItems(req, res);
        });
        // update menu Items
        router.patch("/restaurants/:resId/menu/:menuId/items", (req, res) => {
            this.MenuItems.updateMenuItems(req, res);
        });
        // post order

        router.post("/orders", (request, response) => {
            this.Orders.createOrder(request, response);
        });
        // post- create customer
        router.post("/addcustomer", (request, response) => {
 dev/kapish-patel/creating_schemas
            console.log("Adding New Customer:...");

            console.log("Adding New Customer");
 main
            this.Customer.createCustomer(request, response);
        });
        //post- customer update
        router.post("/updatecustomer/:customerId", (req, res) => {
            console.log("Update Customer:...");
            this.Customer.updateCustomer(req, res);
        });
        this.expressApp.use("/", router);
    }
}
exports.App = App;
