//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    orderId: String;
    resId: String;
    CustomerId: String;
    Date: Date;
    status: String;
    orderType: String;
    quantity: number
    itemName: [String];
}
export {IOrderModel};