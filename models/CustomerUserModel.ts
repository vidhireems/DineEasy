//Imports
import Mongoose from "mongoose";
import { DbConnection } from "../DbConnection";
import { ICustomerUserModel } from "../interfaces/ICustomerUserModel";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "./UserModel";

//Mongoose connections and object
let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

//Class for restaurant model
class CustomerUserModel {
  public schema: any;
  public model: any;

  //constructor initilize the create schema and model
  public constructor() {
    this.createSchema();
    this.createModel();
  }

  //function to create the schema for restaurants
  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        name: { type: String, require: true },
        customerId: { type: String, require: true },
        address: { type: String, require: true },
        contactNumber: { type: String, require: true },
        isCheckedIn: {
          type: Boolean,
          default: false,
        },
        customerType: {
          type: String,
          default: "Freemium",
        },
        refrenceCustomerTypeId: {
          type: String,
          default: "N/A",
        },
      },
      { collection: "CustomerUser" }
    );
  }

  //function to create model
  public createModel(): void {
    if (!mongooseConnection.models.CustomerUser) {
      this.model = mongooseConnection.model<ICustomerUserModel>(
        "CustomerUser",
        this.schema
      );
    } else {
      this.model = mongooseConnection.models.CustomerUser;
    }
  }

  // function for retriving specific customer
  public async retrieveCustomer(response: any, filter: Object): Promise<any> {
    try {
      const query = this.model.findOne(filter);
      query.then((CustomerDetail: any) => {
        if (!CustomerDetail) {
          console.error({ error: "Unable to find Customer" });
          response.status(404).send({ error: "Customer not found" });
        } else {
          response.send(CustomerDetail);
        }
      });
    } catch (err) {
      console.error(err);
      response
        .sendStatus(500)
        .send({
          message: "Internal server error while retrieving Customer detail",
        });
    }
  }

  //add customer
  public async createCustomer(request: any, response: any): Promise<any> {
    try {
      const customerId = uuidv4();
      console.log(request.body);
      const { address, contactNumber, name, email, password } = request.body;
      if (
        !address ||
        !contactNumber ||
        !name ||
        !email ||
        !password ||
        !customerId
      ) {
        return response.status(400).json({ message: "Please fill all fields" });
      }

      //Creating data for createUser
      const userData = {
        customerId: customerId,
        userType: "Customer",
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      };
      //sending data to user model to create user
      const userModel = new UserModel();
      const userResponse = await userModel.createCustomerUser(userData);

      //check if the user was made in user collection
      if (userResponse.message != "User Created successfully") {
        response.status(500).json({
          message: "User not created",
        });
      }
      console.log("User Created:...");
      const customer = new this.model({
        customerId,
        address,
        contactNumber,
        isCheckedIn: false,
        customerType: "Premium",
        referenceCustomerTypeId: "",
      });
      await customer.save();
      console.log("Customer Created:...");

      response.status(200).json({
        message: "Customer Created successfully",
        customer: {
          customerId,
          address,
          contactNumber,
          isCheckedIn: false,
          customerType: "Premium",
          referenceCustomerTypeId: "",
        },
      });
    } catch (error) {
      response.error(500).json({ message: "Error Creating Customer..." });
    }
  }
  //update customer
  //only update address, contactnumber, email, password
  public async updateCustomer(request: any, response: any): Promise<any> {
    try {
      const customerId = request.params.customerId;
      const { address, contactNumber, name, email, password } = request.body;
      if (
        !customerId ||
        !address ||
        !contactNumber ||
        !email ||
        !password ||
        !name
      )
        return response
          .status(400)
          .json({ message: "Please fill all the fields" });

      //find the user and update it in user collection
      const userData = {
        customerId: customerId,
        name: name,
        email: email,
        password: password,
      };
      const userModel = new UserModel();
      const userUpdateResponse = await userModel.updateCustomerUser(userData);
      if (userUpdateResponse.message != "User Updated Successfully") {
        response.status(500).json({
          message: "User not Updates",
        });
      }

      //find the user and update it in customer collection
      const updateCustomer = await this.model.findOneAndUpdate(
        { customerId },
        { address, contactNumber },
        { new: true }
      );
      if (!updateCustomer)
        return response.status(400).json({ message: "Customer Not found" });

      return response.status(200).json({
        message: "Customer Updated",
        customer: updateCustomer,
      });
    } catch (error) {
      console.log("Error Updating Customer:...");
      response.status(500).json({ message: "Error Updating Customer" });
    }
  }
  //delete customer
  //Change customer type
}

export { CustomerUserModel };
