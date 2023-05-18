//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    resId: String;
    orderId: Number;
    name: String;
    quantity: Number;
    itemName: [String];
}
export {IOrderModel};