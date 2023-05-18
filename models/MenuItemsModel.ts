//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IMenuItemsModel } from '../interfaces/IMenuItemsModel';
import { v4 as uuidv4 } from "uuid";


//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for menu model
class MenuItemsModel {
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
                menuId: String,
                resId: String,
                menu :[
                    {
                        itemId: String,
                        category: String,
                        name: String,
                        price: Number,
                        is_veg: Boolean,
                        ingredients: String,
                    }
                ]
            }, {collection: 'menuItems'}
        );
    }
    
    //function for create the model
    public createModel(): void {
        this.model = mongooseConnection.model<IMenuItemsModel>("menuItems", this.schema);
    }
    
    // function for retrieving all the menu items in a restaurant menu
    public async retrieveMenuItems(response: any, filter:object): Promise<any> {
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

    // Add menu items
    public async createMenuItems(request: any, response: any, data: any): Promise<any> {
        try {
          const itemId = uuidv4();
          request.body.itemId = itemId;
          const { resId, menuId } = data;
          const menu = request.body;
          console.log(menu);
          if (!resId || !menuId || !menu) {
            return response.status(400).json({ message: "Please fill all fields" });
          }
          
          let menuItems = await this.model.findOne({ resId, menuId });
      
          if (menuItems) {
            if (!menuItems.menu || !Array.isArray(menuItems.menu)) {
              menuItems.menu = [];
            }
            menuItems.menu.push(menu);
          } else {
            menuItems = new this.model({
              menuId,
              resId,
              menu: [menu],
            });
          }
      
          await menuItems.save();
      
          response.status(200).json({
            message: "Menu items successfully added",
            menuItems: {
              menuId,
              resId,
              menu,
            },
          });
      
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: "Internal server error while creating menu items" });
        }
      }

    // Delete Menu item
    public async deleteMenuItems(request: any, response: any): Promise<any> {
        try {
            const { resId, menuId } = request.params;
            const { names } = request.body;

            if (!resId || !menuId || !names || !Array.isArray(names)) {
                return response.status(400).json({ message: "Invalid request body" });
            }
            const result = await this.model.updateOne(
                { resId, menuId }, 
                { 
                    $pull: { 
                        menu: { 
                            name: { $in: names } 
                        } 
                    } 
                });
            
            if (result.modifiedCount > 0) {
                //If all menu items are deleted then also delete the menuitem document and menu document
                const document = await this.model.findOne({ resId, menuId });
                if(document.menu.length === 0)
                {
                    await this.model.deleteOne({ resId, menuId });
                }
                response.status(200).json({ message: "Menu items deleted successfully" });
            } else {
                response.status(404).json({ message: "Menu not found" });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting menu items" });
        }
    }
    
    // Delete all menu items in a menu
    public async deleteAllMenuItems(request: any, response: any, next: any): Promise<any> {
        try {
            const { resId, menuId } = request.params;
            if (!resId || !menuId ) {
                return response.status(400).json({ message: "Invalid request body" });
            }
            await this.model.deleteMany({resId, menuId});
            next();
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting menu items" });
        }
    }

    // Delete all menu items for a restaurant
    public async deleteAllMenuItemsForRestaurant(request: any, response: any, next: any): Promise<any> {
        try {
            const { resId } = request.params;
            if (!resId ) {
                return response.status(400).json({ message: "Invalid request body" });
            }
            await this.model.deleteMany({resId});
            next();
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting menu items for restaurant" });
        }
    }

    // Update menu item
    public async updateMenuItems(request: any, response: any): Promise<any> {
        try {
          const {resId, menuId } = request.params;
          const { category, name, price, is_veg, ingredients } = request.body;
          if (!resId || !menuId) {
            return response.status(400).json({ message: "Please fill all fields" });
          }
      
          const result = await this.model.findOneAndUpdate(
            { resId, menuId },
            {
              $set: {
                "menu.$[item].category": category,
                "menu.$[item].name": name,
                "menu.$[item].price": price,
                "menu.$[item].is_veg": is_veg,
                "menu.$[item].ingredients": ingredients,
              },
            },
            { 
              new: true, 
              arrayFilters: [{ "item.name": name }] 
            }
          );
      
          if (!result) {
            return response.status(404).json({ message: "Menu item not found!" });
          }
      
          response.status(200).json({
            message: "Menu item updated successfully",
            restaurant: result,
          });
        } catch (error) {
          console.error(error);
          response.status(500);
        }
    }
}

export {MenuItemsModel};



