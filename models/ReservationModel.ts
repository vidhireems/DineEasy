//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IReservationModel } from '../interfaces/IReservationModel';
const bcrypt = require('bcrypt');

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class ReservationModel {
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
                id: String,
                time: String,
                peopleCount: Number,
                status: String,
                CheckInTime: String,
                PremCustomerId: String,
                RestaurantId: String,
            }, {collection: 'Reservation'}
        );
    }

    //function to create model for the User interface and schema
    public createModel(): void {
        this.model = mongooseConnection.model<IReservationModel>("Reservation", this.schema);
    }
    
    // function for retriving specific user Reservation
    public async retrieveUserReservation(response:any, filter:Object): Promise<any> {

        try {
            const query = this.model.findOne(filter);
            query.then((UserDetail:any) => {
                if (!UserDetail) {
                    console.error({ error: "Unable to find User Reservation"});
                    response.status(404).send({ error: "Reservation not found"});
                } else {
                    response.send(UserDetail);
                }});
        }catch(err) {
            console.error(err);
               response.sendStatus(500).send({ message: "Internal server error while retrieving User Reservation" });
        }
    }
    //login user
    //logout user
    // delete user will delete all the items related to that user
    // add new user
}

export {ReservationModel};