//Imports
import { RestaurantModel } from "./models/RestaurantModel";
import express = require("express");
import * as bodyParser from "body-parser";
import { OrderModel } from "./models/OrderModel";

//Class App which creates and configure the express application
class App {
  public expressApp: express.Application;
  public Restaurants: RestaurantModel;
  public Orders: OrderModel;

  //Constructor which runs the configuration on the express application and calls the routes function
  constructor() {
    this.expressApp = express();
    this.Restaurants = new RestaurantModel();
    this.Orders = new OrderModel();
    this.routes();
  }

  //configure the middleware of express application
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  //Api Endpoints....
  private routes(): void {
    let router = express.Router();

    //Retrive all the restaurant endpoint
    router.get("/restaurants", (req, res) => {
      console.log("Query all the restaurants");
      this.Restaurants.retrieveAllRestaurants(res);
    });

    // post order
    router.post("/order", (req, res) => {
      console.log("Customer please make an order");
      this.Orders.makeOrder(req, res);
    });

    this.expressApp.use("/", router);
  }
}

export { App };
