import Mongoose from 'mongoose';
import { DbConnection } from '../DbConnection';
import { IOrderModel } from '../interfaces/IOrderModel';

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
        email: {
          type: String,
          required: true,
        },
        foodName: {
          type: [String],
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
      { collection: 'order', timestamps: true }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>('order', this.schema);
  }

  public async makeOrder(request: any, response: any): Promise<any> {
    try {
      const { name, email, foodName, address } = request.body;
      const order = new this.model({ name, email, foodName, address });
      await order.save();
      response.status(200).json(order);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}

export { OrderModel };
