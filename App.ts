	//Imports
import { RestaurantModel } from "./models/RestaurantModel";
import { MenuModel } from "./models/MenuModel";
import { MenuItemsModel } from "./models/MenuItemsModel";
import express = require("express");
import * as bodyParser from "body-parser";
import { OrderModel } from "./models/OrderModel";
import { CustomerUserModel } from "./models/CustomerUserModel";

//Class App which creates and configure the express application
class App {
  public expressApp: express.Application;
  public Restaurants: RestaurantModel;
  public Menu: MenuModel;
  public MenuItems: MenuItemsModel;
  public Orders: OrderModel;
  public Customer: CustomerUserModel;

  //Constructor which runs the configuration on the express application and calls the routes function
  constructor() {
    this.expressApp = express();
    this.Restaurants = new RestaurantModel();
    this.Menu = new MenuModel();
    this.MenuItems = new MenuItemsModel();
    this.Orders = new OrderModel();
    this.Customer = new CustomerUserModel();
    this.middleware();
    this.routes();
  }

  //configure the middleware of express application
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
  }

  //Api Endpoints....
  private routes(): void {
    let router = express.Router();

    //Retrieve all the restaurant endpoint
    router.get("/restaurants", (req, res) => {
      console.log("Query all the restaurants");
      this.Restaurants.retrieveAllRestaurants(res);
    });

    //Retrieve specific restaurant details
    router.get('/restaurants/:id', (req, res) => {
      let id = req.params.id;
      console.log('Query single restaurant with id: ' + id);
      this.Restaurants.retrieveRestaurantDetails(res, {id: id});
    }); 

    //Create restaurant details
    router.post("/restaurants", (request, response) => {
      this.Restaurants.createRestaurant(request, response);
    });

  
    //Retrieve Menu
    router.get("/restaurant/:restaurantId/menu", (req, res) => {
      var restaurantId = req.params.restaurantId;
      console.log("Query single menu with restid: " + restaurantId);
      this.Menu.retrieveMenu(res, { restaurantId: restaurantId });
    });

    //Retrieve Menu Items
    router.get("/restaurant/:restaurantId/menu/:menuId", (req, res) => {
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

export { App };
