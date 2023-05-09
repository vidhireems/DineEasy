//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface ICustomerUserModel extends Mongoose.Document {
    id: String;
    address: String;
    contactNumber: String;
    isCheckedIn: Boolean;
    customerType: String;
    refrenceCustomerTypeId: String;
}
export {ICustomerUserModel};