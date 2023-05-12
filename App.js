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
//Class App which creates and configure the express application
class App {
    //Constructor which runs the configuration on the express application and calls the routes function
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
    //configure the middleware of express application
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    }
    //Api Endpoints....
    routes() {
        let router = express.Router();
        //Retrieve all the restaurant endpoint
        router.get("/restaurants", (req, res) => {
            console.log("Query all the restaurants");
            this.Restaurants.retrieveAllRestaurants(res);
        });
        //Retrieve specific restaurant details
        router.get('/restaurants/:resId', (req, res) => {
            var id = req.params.resId;
            console.log('Query single restaurant with id: ' + id);
            this.Restaurants.retrieveRestaurantDetails(res, { resId: id });
        });
        //Create restaurant 
        router.post("/restaurants", (request, response) => {
            this.Restaurants.createRestaurant(request, response);
        });
        //Delete Restaurant
        router.delete("/restaurants/:resId", (req, res) => {
            var resId = req.params.resId;
            this.Restaurants.deleteRestaurant(req, res);
        });
        //Update restaurant
        //   router.put("/restaurants/:resId",(req,res) => {
        //     var resId = req.params.resId;
        //     this.Restaurants.updateRestaurant(req,res);
        //  });
        router.put("/restaurants/:resId", (req, res) => {
            // var resId = req.params.resId;
            this.Restaurants.updateRestaurant(req, res);
            // .then((updatedRestaurant) =>
            //     res.status(200).json({ message: "Restaurant updated successfully", restaurant: updatedRestaurant })
            //   )
            //   .catch((error) => res.status(500).json({ message: "An error occurred while updating the restaurant", error }));
        });
        //Retrieve Menu
        router.get("/restaurants/:restaurantId/menu", (req, res) => {
            var restaurantId = req.params.restaurantId;
            console.log("Query single menu with restid: " + restaurantId);
            this.Menu.retrieveMenu(res, { restaurantId: restaurantId });
        });
        //Retrieve Menu Items
        router.get("/restaurants/:restaurantId/menu/:menuId", (req, res) => {
            var restaurantId = req.params.restaurantId;
            var menuId = req.params.menuId;
            console.log("Query single menu with restid: " + restaurantId);
            this.MenuItems.retrieveMenuItems(res, {
                menuId: menuId,
                restaurantId: restaurantId,
            });
        });
        // post order
        router.post("/orders", (request, response) => {
            this.Orders.createOrder(request, response);
        });
        // post customer
        router.post("/addcustomer", (request, response) => {
            console.log("Adding New Customer");
            this.Customer.createCustomer(request, response);
        });
        this.expressApp.use("/", router);
    }
}
exports.App = App;
