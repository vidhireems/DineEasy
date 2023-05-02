//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IRestaurantModel } from '../interfaces/IRestaurantModel';

// Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

// Class for restaurant model
class RestaurantModel {
    public schema:any;
    public model:any;

    // Constructor initilize the create schema and model
    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Function to create the schema for restaurants
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                id: Number,
                name: String,
                image: String,
                location: String,
                rating: Number,
                reviews: Number,
                cost: String,
                cuisines: String,
                contact: String,
                neighborhood: String,
                hours: String,
                parkingdetails: String,
                isValetPark: Boolean,
                numberOfTables: Number,
            }, {collection: 'restaurant'}
        );
    }

    // Function to create model for the reataurant interface and schema
    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("restaurant", this.schema);
    }
    
    // Function for retrieving all the restaurants(have to use promise after mongoose version 6)
    public async retrieveAllRestaurants(response: any): Promise<any> {
        try {
            const itemArray = await this.model.find().exec();
            response.json(itemArray);
        } catch (err) {
            console.error(err);
            response.sendStatus(500);
        }
    }  
    
    // Function for retrieving restaurant specific information 
    public async retrieveRestaurantDetails(response:any, filter:Object): Promise<any> {
        try {
          const restaurantdetail = await this.model.findOne(filter);
          if (!restaurantdetail) {
            console.error({ error: "Unable to find the Restaurant"});
            response.status(404).send({ error: "Restaurant not found"});
          } else {
            response.send(restaurantdetail);
          }
        } catch (err) {
          console.error(err);
          response.status(500).send({ message: "Internal server error while retrieving restaurant details" }); 
        }
    }
}

export {RestaurantModel};