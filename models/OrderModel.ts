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
        orderDate: Date,
        status: String,
        orderType: String,
        quantity: Number,
        itemIds: [String],
      },
      { collection: "order", timestamps: true }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>("order", this.schema);
  }

  //post create order 
  public async createOrder(request: any, response: any): Promise<any> {
    try {
      const orderId = uuidv4();
      const { restaurantId, name, quantity, itemName } = request.body;
      if (!restaurantId || !name || !quantity || !itemName) {
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
        order: {
          orderId,
          restaurantId,
          name,
          quantity,
          itemName,
        },
      });
      // console.log(response);
    } catch (error) {
      console.error(error);
      console.log(error);
      response.sendStatus(500);
    }
  }

  // delete order
}
export { OrderModel };