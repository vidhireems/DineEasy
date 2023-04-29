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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const RestaurantModel_1 = require("./models/RestaurantModel");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
//Class App which creates and configure the express application
class App {
    //Constructor which runs the configuration on the express application and calls the routes function
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.Restaurants = new RestaurantModel_1.RestaurantModel();
        this.routes();
    }
    //configure the middleware of express application
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    //Api Endpoints....
    routes() {
        let router = express_1.default.Router();
        //Retrive all the restaurant endpoint
        router.get('/restaurants', (req, res) => {
            console.log("Query all the restaurants");
            this.Restaurants.retrieveAllRestaurants(res);
        });
        this.expressApp.use('/', router);
    }
}
exports.App = App;