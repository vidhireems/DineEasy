//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IMenuModel } from '../interfaces/IMenuModel';
import { v4 as uuidv4 } from "uuid";

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for menu model
class MenuModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    //constructor initilize the create schema and model
    public constructor() {
        this.createSchema();
        this.createModel();
    }

    //function to create the schema for Menu
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                resId: String,
                menuId: String,
                name: String
                
            }, {collection: 'menu'}
        );
    }
    // function for creating model
    public createModel(): void {
        this.model = mongooseConnection.model<IMenuModel>("menu", this.schema);
    }
    
     // function for retrieving all the Menu in a restaurant
     public async retrieveMenu(response: any, filter:object): Promise<any> {
        try {
            const itemArray = await this.model.find(filter).exec();
            if (itemArray.length == 0) {
                response.sendStatus(404);
            }
            else
            {
                response.json(itemArray);
            }
        } catch (err) {
            console.error(err);
            response.sendStatus(500);
        }
    }

    // add new menu

    public async createMenu(request: any, response: any): Promise<any> {
        try {
          const menuId= uuidv4();
          const {resId} = request.params;
          const { name} = request.body;
          if (!resId || !name) {
            return response.status(400).json({ message: "Please fill all fields" });
          }
          //TODO: Check if the restaurant is actaullt present
          const restaurant = new this.model({
            resId,
            menuId,
            name
          });
          await restaurant.save();
          response.status(200).json({
            message: "Menu created successfully!",
            restaurant: {
                menuId,
                resId,
                name
            },
          });
        } catch (error) {
          console.error(error);
          console.log(error);
          response.sendStatus(500);
        }
      }

    
    // Delete a menu
    public async deleteMenu(request: any, response: any): Promise<any> {
        try {
            const { resId, menuId } = request.params;
            if (!resId || !menuId ) {
                return response.status(400).json({ message: "Invalid request body" });
            }
            const result = await this.model.deleteMany({resId, menuId});
            if (result.deletedCount === 0) {
                response.status(404).json({ message: "Menu not found!" });
            } 
            else {
                response.status(200).json({ message: "Menu deleted successfully!" });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting menu items" });
        }
    }

    // Delete all menu items for a restaurant
    public async deleteAllMenuForRestaurant(request: any, response: any, next: any): Promise<any> {
        try {
            const { resId } = request.params;
            if (!resId ) {
                return response.status(400).json({ message: "Invalid request body" });
            }
            const result = await this.model.deleteMany({resId});
            next();
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting menu items for restaurant" });
        }
    }

}
export {MenuModel};



