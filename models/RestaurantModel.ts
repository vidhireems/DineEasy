import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IRestaurantModel } from '../interfaces/IRestaurantModel';

let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

class RestaurantModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

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

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("restaurant", this.schema);
    }

    public retrieveAllRestaurants(response:any): any {
        var query = this.model.find({});
        query.exec( (err :any, itemArray :any) => {
            response.json(itemArray) ;
        });
    }
}