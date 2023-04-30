//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface IOrderModel extends Mongoose.Document {
    id: Number;
    name: String;
    itemName: String;
    quantity: Number;
}
export {IOrderModel};