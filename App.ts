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
        this.routes();
    }

    //configure the middleware of express application
    private middleware():void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: false}));
    }

    //Api Endpoints....
    private routes():void{
        let router = express.Router();

        //Retrive all the restaurant endpoint
        router.get('/restaurants', (req, res) => {
            console.log("Query all the restaurants");
            this.Restaurants.retrieveAllRestaurants(res);
        });

        this.expressApp.use('/', router);
    }
}

export {App};



