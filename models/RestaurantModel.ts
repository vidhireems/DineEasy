//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
import { MenuModel } from "./MenuModel";
import { v4 as uuidv4 } from "uuid";

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
    public async getRestaurantDetailsById(response:any, filter:Object): Promise<any> {
        try {
          const restaurantdetail = await this.model.findOne(filter);
          if (!restaurantdetail) {
            console.error({ error: "Unable to find the Restaurant"});
            response.status(404).json({ error: "Restaurant not found"});
          } else {
            response.json(restaurantdetail);
          }
        } catch (err) {
          console.error(err);
          response.status(500).json({ message: "Internal server error while retrieving restaurant details" }); 
        }
    }

    // Delete specific restaurant
    public async deleteRestaurant(request: any, response: any): Promise<any> {
        try {
            const resId = request.params.resId;
            const result = await this.model.deleteOne({ resId: resId });
            if (result.deletedCount === 1) {
                response.status(200).json({ message: `Restaurant deleted successfully` });
            } else {
                response.status(404).json({ message: `Restaurant not found` });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal server error while deleting restaurant" });
        }
    }
    
   // Add new restaurant
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
            message: "Restaurant created succcessfully!",
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
        } catch (error) {
          console.error(error);
          console.log(error);
          response.sendStatus(500);
        }
      }


    // Update restaurant 
    public async updateRestaurant(req: any, res: any): Promise<any> {
        try {
          const resId = req.params.resId;
      
          const { name, image, location, rating, reviews, cost, cuisines, contact, neighborhood, hours, parkingdetails, isValetPark, numberOfTables } = req.body;
      
          if (!name || !image || !location || !rating || !reviews || !cost || !cuisines || !contact || !neighborhood || !hours || !parkingdetails || !isValetPark || !numberOfTables) {
            return res.status(400).json({ message: "Please fill all fields" });
          }
      
          const updatedRestaurant = await this.model.findOneAndUpdate(
            { resId },
            {
              $set: {
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
            },
            { new: true }
          );
      
          if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
          }
      
          res.status(200).json({
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant,
          });
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
      }
}

export {RestaurantModel};