//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    orderId: String;
    resId: String;
    customerId: String;
    orderDate: Date;
    status: String;
    orderType: String;
    quantity: Number;
    itemIds: [String];
}
export {IOrderModel};