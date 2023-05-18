import Mongoose from "mongoose";
import { DbConnection } from "../DbConnection";
import { IOrderModel } from "../interfaces/IOrderModel";
import { v4 as uuidv4 } from "uuid";

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
        orderId: String,
        resId: String,
        customerId: String,
        orderDate: {
          type: Date,
          default: Date.now
        },
        status: {
          type: String,
          default: "Received"
        },
        orderType: {
          type: String,
          default: "Normal"
        },
        quantity: Number,
        itemIds: [String],
      },
      { collection: "order", timestamps: true }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>("order", this.schema);
  }

  //post create order complete this 
  public async createOrder(request: any, response: any): Promise<any> {
    try {
      const orderId = uuidv4();
      const restaurantId = request.params.resId;
      const { customerId, orderDate, status, orderType, quantity, itemIds } = request.body;
  
      // Check if all required fields are provided
      if (!customerId || !status || !orderType || !quantity || !itemIds) {
        return response.status(400).json({ message: "Please fill all fields" });
      }
  
      const order = new this.model({
        orderId,
        resId: restaurantId,
        customerId,
        orderDate: Date.now,
        status: "Received",
        orderType: "Normal",
        quantity,
        itemIds,
      });
  
      await order.save();
  
      response.status(200).json({
        message: "Order placed successfully",
        order: {
          orderId,
          resId: restaurantId,
          customerId,
          orderDate,
          status,
          orderType,
          quantity,
          itemIds,
        },
      });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }

  // delete order
}
export { OrderModel };