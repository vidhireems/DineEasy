//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    // id: Number;
    name: String;
    quantity: Number;
    itemName: String;
    // price: Number;
}
export {IOrderModel};