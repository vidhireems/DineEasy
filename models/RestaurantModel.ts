//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IRestaurantModel } from '../interfaces/IRestaurantModel';

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class RestaurantModel {
    public schema:any;
    public model:any;

    //constructor initilize the create schema and model
    public constructor() {
        this.createSchema();
        this.createModel();
    }

    //function to create the schema for restaurants
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

    //function to create model for the reataurant interface and schema
    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("restaurant", this.schema);
    }
}

export {RestaurantModel};