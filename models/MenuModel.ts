//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IMenuModel } from '../interfaces/IMenuModel';



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
                restaurantId: Number,
                menuId: Number,
                name: String
                
            }, {collection: 'menu'}
        );
    }
    // fucntionn for creating model
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
    // delete menu
    
    }
export {MenuModel};



