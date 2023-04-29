//Imports
import { RestaurantModel } from "./models/RestaurantModel";
import express = require("express");
import * as bodyParser from 'body-parser';

//Class App which creates and configure the express application
class App{
    public expressApp: express.Application;
    public Restaurants: RestaurantModel;

    //Constructor which runs the configuration on the express application and calls the routes function
    constructor()
    {
        this.expressApp = express();
        this.Restaurants = new RestaurantModel();
    }

}

export {App};



