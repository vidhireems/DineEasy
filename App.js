"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
//Imports
var RestaurantModel_1 = require("./models/RestaurantModel");
var express = require("express");
//Class App which creates and configure the express application
var App = /** @class */ (function () {
    //Constructor which runs the configuration on the express application and calls the routes function
    function App() {
        this.expressApp = express();
        this.Restaurants = new RestaurantModel_1.RestaurantModel();
    }
    return App;
}());
exports.App = App;
