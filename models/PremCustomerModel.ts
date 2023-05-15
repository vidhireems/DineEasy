//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { IPremCustomerModel } from "../interfaces/IPremCustomerModel";

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class PremCustomerModel {
    public schema:any;
    public model:any;

    //constructor initilize the create schema and model
    public constructor() {
        this.createSchema();
        this.createModel();
    }

    //function to create the schema for Premium Customer
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                id: String,
                tableNumber: Number,  
                numberOfPeople: Number,
            }, {collection: 'PremCustomer'}
        );
    }

    //function to create model 
    public createModel(): void {
        this.model = mongooseConnection.model<IPremCustomerModel>("PremCustomer", this.schema);
    }
    
    // function for retriving specific Premium customer
    public async retrievePremCustomer(response:any, filter:Object): Promise<any> {
        try {
            const query = this.model.findOne(filter);
            query.then((CustomerDetail:any) => {
                if (!CustomerDetail) {
                    console.error({ error: "Unable to find Premium Customer"});
                    response.status(404).send({ error: "Premium Customer not found"});
                } else {
                    response.send(CustomerDetail);
                }});
        }catch(err) {
            console.error(err);
               response.sendStatus(500).send({ message: "Internal server error while retrieving Premium Customer detail" });
        }
    }
    //add PremCustomer
    

}

export {PremCustomerModel};