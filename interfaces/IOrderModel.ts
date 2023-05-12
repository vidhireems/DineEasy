//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    resId: Mongoose.Types.ObjectId;
    orderId: Number;
    name: String;
    quantity: Number;
    itemName: [String];
}
export {IOrderModel};