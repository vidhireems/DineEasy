//Imports
import Mongoose from 'mongoose';
import { DbConnection } from "../DbConnection";
import { ICustomerUserModel } from "../interfaces/ICustomerUserModel";
import { v4 as uuidv4 } from "uuid";

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
                customerId:{ type:String, require: true },
                address:{ type:String, require: true },
                contactNumber:{ type:String, require: true },
                isCheckedIn: {
                    type:Boolean,
                    default:false
                },
                customerType:{
                    type:String,
                    default:"Freemium"
                },
                refrenceCustomerTypeId: {
                    type:String,
                    default:'N/A'
                },
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
    public async createCustomer(request: any, response: any):Promise<any>{
        try{
            const customerId = uuidv4();
            console.log(request.body);
            const { address, contactNumber } = request.body;
            if (!address || !contactNumber) {
                return response.status(400).json({ message: "Please fill all fields" });
            }
            const customer = new this.model({
                customerId,
                address,
                contactNumber,
                isCheckedIn: false,
                customerType: "Freemium",
                referenceCustomerTypeId: "", 
            });
            await customer.save();
            response.status(200).json({
                message: "User Created successfully",
                customer: {
                    customerId,
                    address,
                    contactNumber,
                    isCheckedIn: false,
                    customerType: "Freemium",
                    referenceCustomerTypeId: "",
                },
            });
        } catch(error) {
            response.error(500).json( {message: "Error Creating User..."});
        }
    }
}

export {CustomerUserModel};