import Mongoose from "mongoose";
import { DbConnection } from "../DbConnection";
import { IOrderModel } from "../interfaces/IOrderModel";

let mongooseConnection = DbConnection.mongooseConnection;
let mongooseObj = DbConnection.mongooseInstance;

class OrderModel {
  public schema: any;
  public model: any;

  constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        restaurantId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: "restaurant",
        },
        orderId: Number,
        name: String,
        quantity: Number,
        itemName: String,
        //price
      },
      { collection: "order", timestamps: true }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>("order", this.schema);
  }

  public async createOrder(request: any, response: any): Promise<any> {
    try {
      const { restaurantId, orderId, name, quantity, itemName } = request.body;
      if (!restaurantId || !orderId || !name || !quantity || !itemName) {
        return response.status(400).json({ message: "Please fill all fields" });
      }
      const order = new this.model({
        restaurantId,
        orderId,
        name,
        quantity,
        itemName,
      });
      await order.save();
      response.status(200).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      response.sendStatus(500);
    }
  }

}

export { OrderModel };
