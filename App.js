"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
//Imports
var RestaurantModel_1 = require("./models/RestaurantModel");
var MenuModel_1 = require("./models/MenuModel");
var MenuItemsModel_1 = require("./models/MenuItemsModel");
var express = require("express");
var bodyParser = require("body-parser");
//Class App which creates and configure the express application
var App = /** @class */ (function () {
    //Constructor which runs the configuration on the express application and calls the routes function
    function App() {
        this.expressApp = express();
        this.Restaurants = new RestaurantModel_1.RestaurantModel();
        this.Menu = new MenuModel_1.MenuModel();
        this.MenuItems = new MenuItemsModel_1.MenuItemsModel();
        this.routes();
        this.middleware();
    }
    //configure the middleware of express application
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    //Api Endpoints....
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        //Retrieve all the restaurant endpoint
        router.get('/restaurants', function (req, res) {
            console.log("Query all the restaurants");
            _this.Restaurants.retrieveAllRestaurants(res);
        });
        //Retrieve Menu
        router.get('/restaurant/:restaurantId/menu', function (req, res) {
            var restaurantId = req.params.restaurantId;
            console.log('Query single menu with restid: ' + restaurantId);
            _this.Menu.retrieveMenu(res, { restaurantId: restaurantId });
        });
        //Retrieve Menu Items
        router.get('/restaurant/:restaurantId/menu/:menuId', function (req, res) {
            var restaurantId = req.params.restaurantId;
            var menuId = req.params.menuId;
            console.log('Query single menu with restid: ' + restaurantId);
            _this.MenuItems.retrieveMenuItems(res, { menuId: menuId, restaurantId: restaurantId });
        });
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
