//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
import { v4 as uuidv4 } from "uuid";

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
                resId: String,
                name: String,
                image: String,
                location: String,
                rating:Number,
                reviews:Number,
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
    
     // function for retriving all the restaurants(have to use promise after mongoose version 6)
    public async retrieveAllRestaurants(response: any): Promise<any> {
        try {
            const itemArray = await this.model.find().exec();
            response.json(itemArray);
        } catch (err) {
            console.error(err);
            response.sendStatus(500);
        }
    }  
    
    public async retrieveRestaurantDetails(response:any, filter:Object): Promise<any> {
        const query = this.model.findOne(filter);
        query.then((restaurantdetail:any) => {
            if (!restaurantdetail) {
                console.error({ error: "Unable to find the Restaurant"});
                response.status(404).send({ error: "Restaurant not found"});
            } else {
                response.send(restaurantdetail);
            }
        }).catch((err:any) => {
            console.error(err);
            response.status(500).send({ message: "Internal server error while retrieving restaurant detail" }); 
        });
    }

    // delete restaurant will delete menues and items 




    // add new restaurants
    public async createRestaurant(request: any, response: any): Promise<any> {
        try {
          const resId = uuidv4();
          const { name,  image,location,rating,reviews,cost,cuisines,contact, neighborhood, hours, parkingdetails,isValetPark,numberOfTables} = request.body;
          if (!name|| !image || !location|| !rating|| !reviews || !cost || !cuisines || !contact|| !neighborhood || !hours || !parkingdetails|| !isValetPark||!numberOfTables) {
            return response.status(400).json({ message: "Please fill all fields" });
          }
          const restaurant = new this.model({
            resId,
            name,
            image,
            location,
            rating,
            reviews,
            cost,
            cuisines,
            contact,
            neighborhood,
            hours,
            parkingdetails,
            isValetPark,
            numberOfTables,
          });
          await restaurant.save();
          response.status(200).json({
            message: " Congrats",
            restaurant: {
                resId,
                name,
                image,
                location,
                rating,
                reviews,
                cost,
                cuisines,
                contact,
                neighborhood,
                hours,
                parkingdetails,
                isValetPark,
                numberOfTables,
            },
          });
          // console.log(response);
        } catch (error) {
          console.error(error);
          console.log(error);
          response.sendStatus(500);
        }
      }


    // Update restaurant 
    // functions related to filtering restaurants
}

export {RestaurantModel};