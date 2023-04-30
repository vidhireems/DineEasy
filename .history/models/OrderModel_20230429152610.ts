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
        itemName: {
          type: [String],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      { collection: 'order' }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IOrderModel>('order', this.schema);
  }

  public async retrieveAllOrders(response: any): Promise<any> {
    try {
      const itemArray = await this.model.find().exec();
      response.json(itemArray);
    } catch (err) {
      console.error(err);
      response.sendStatus(500);
    }
  }
}

export { OrderModel };
