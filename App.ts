//Imports
import { RestaurantModel } from "./models/RestaurantModel";
import { MenuModel } from "./models/MenuModel";
import { MenuItemsModel } from "./models/MenuItemsModel";
import express = require("express");
import * as bodyParser from "body-parser";
import { OrderModel } from "./models/OrderModel";
import { CustomerUserModel } from "./models/CustomerUserModel";
import cors from "cors";

// Class App which creates and configure the express application
class App {
  public expressApp: express.Application;
  public Restaurants: RestaurantModel;
  public Menu: MenuModel;
  public MenuItems: MenuItemsModel;
  public Orders: OrderModel;
  public Customer: CustomerUserModel;

  // Constructor which runs the configuration on the express application and calls the routes function
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

  // Configure the middleware of express application
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use(express.static("pages"));
    this.expressApp.use(cors());
  }

  // Api Endpoints....
  private routes(): void {
    let router = express.Router();

    // Retrieve all the restaurant endpoint
    router.get("/restaurants", (req: any, res: any) => {
      console.log("Query all the restaurants");
      this.Restaurants.retrieveAllRestaurants(res);
    });

    // Retrieve specific restaurant details
    router.get("/restaurants/:resId", (req: any, res: any) => {
      let resId = req.params.resId;
      console.log("Query single restaurant with id: " + resId);
      this.Restaurants.getRestaurantDetailsById(res, { resId: resId });
    });

    // Routing post order requests to save data
    //Create restaurant
    router.post("/restaurants", (request: any, response: any) => {
      console.log("Creating restaurant");
      this.Restaurants.createRestaurant(request, response);
    });

    //Delete Restaurant
    router.delete("/restaurants/:resId", (req: any, res: any) => {
      this.MenuItems.deleteAllMenuItemsForRestaurant(req, res, () => {
        this.Menu.deleteAllMenuForRestaurant(req, res, () => {
          this.Restaurants.deleteRestaurant(req, res);
        });
      });
    });

    //Update restaurant
    router.put("/restaurants/:resId", (req: any, res: any) => {
      this.Restaurants.updateRestaurant(req, res);
    });

    //Retrieve Menu
    router.get("/restaurants/:resId/menu", (req: any, res: any) => {
      var resId = req.params.resId;
      console.log("Query single menu with restid: " + resId);
      this.Menu.retrieveMenu(res, { resId: resId });
    });

    //Create menu
    router.post("/restaurants/:resId/menu", (req: any, res: any) => {
      this.Menu.createMenu(req, res);
    });

    //Delete menu
    router.delete("/restaurants/:resId/menu/:menuId", (req: any, res: any) => {
      this.MenuItems.deleteAllMenuItems(req, res, () => {
        this.Menu.deleteMenu(req, res);
      });
    });

    //Retrieve Menu Items
    router.get(
      "/restaurants/:resId/menu/:menuId/items",
      (req: any, res: any) => {
        var resId = req.params.resId;
        var menuId = req.params.menuId;
        console.log("Query single menu with restid: " + resId);
        this.MenuItems.retrieveMenuItems(res, {
          menuId: menuId,
          resId: resId,
        });
      }
    );

    // Create menu Items
    router.post(
      "/restaurants/:resId/menu/:menuId/items",
      (req: any, res: any) => {
        this.MenuItems.createMenuItems(req, res);
      }
    );

    // Delete menu Items
    router.delete(
      "/restaurants/:resId/menu/:menuId/items",
      (req: any, res: any) => {
        this.MenuItems.deleteMenuItems(req, res);
      }
    );

    // update menu Items
    router.patch(
      "/restaurants/:resId/menu/:menuId/items",
      (req: any, res: any) => {
        this.MenuItems.updateMenuItems(req, res);
      }
    );

    // post order - figure out the route
    router.post("/order/:resId", (request: any, response: any) => {
      this.Orders.createOrder(request, response);
    });

    // post- create customer
    router.post("/addcustomer", (request: any, response: any) => {
      console.log("Adding New Customer:...");
      this.Customer.createCustomer(request, response);
    });

    //post- customer update
    router.post("/updatecustomer/:customerId", (req: any, res: any) => {
      console.log("Update Customer:...");
      this.Customer.updateCustomer(req, res);
    });

    this.expressApp.use("/", router);
  }
}

export { App };
