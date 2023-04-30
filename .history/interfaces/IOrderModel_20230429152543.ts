//imports
import Mongoose from 'mongoose';

//Interface for order model
interface IOrderModel extends Mongoose.Document {
    id: Number;
    name: String;
    itemName: String;
    quantity: Number;
    price: Number;
}
export {IOrderModel};