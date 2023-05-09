//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { ICustomerUserModel } from "../interfaces/ICustomerUserModel";

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class CustomerUserModel {
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
                address: String,
                contactNumber: String,
                isCheckedIn: Boolean,
                customerType: String,
                refrenceCustomerTypeId: String,
            }, {collection: 'CustomerUser'}
        );
    }

    //function to create model 
    public createModel(): void {
        this.model = mongooseConnection.model<ICustomerUserModel>("CustomerUser", this.schema);
    }
    
    // function for retriving specific customer
    public async retrieveCustomer(response:any, filter:Object): Promise<any> {

        try {
            const query = this.model.findOne(filter);
            query.then((CustomerDetail:any) => {
                if (!CustomerDetail) {
                    console.error({ error: "Unable to find Customer"});
                    response.status(404).send({ error: "Customer not found"});
                } else {
                    response.send(CustomerDetail);
                }});
        }catch(err) {
            console.error(err);
               response.sendStatus(500).send({ message: "Internal server error while retrieving Customer detail" });
        }
    }
    //add customer
}

export {CustomerUserModel};