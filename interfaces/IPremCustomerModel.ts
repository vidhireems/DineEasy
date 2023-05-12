//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface IPremCustomerModel extends Mongoose.Document {
    id: String;
    isValeParking: Boolean;
    tableNumber: Number;
    numberOfPeople: Number;
}
export {IPremCustomerModel};