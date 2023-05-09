//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IMenuItemsModel } from '../interfaces/IMenuItemsModel';


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
                menuId: Number,
                restaurantId: Number,
                menu :[
                    {
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

    // delete menu item
    // add menu items
    // update menu item
}
export {MenuItemsModel};



