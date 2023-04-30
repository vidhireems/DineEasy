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
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        itemName: {
          type: [String],
          required: true,
        },
        price: {
          type: Number,
          required: false,
        },
      },
      { collection: "order", timestamps: true }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>("order", this.schema);
  }

  public async makeOrder(request: any, response: any): Promise<any> {
    try {
      const { name, quantity, itemName, price } = request.body;
      const order = new this.model({ name, quantity, itemName, price });
      await order.save();
      response.status(200).json(order);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}

export { OrderModel };
