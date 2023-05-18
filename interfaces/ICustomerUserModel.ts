//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface ICustomerUserModel extends Mongoose.Document {
    name: String;
    customerId: String;
    address: String;
    contactNumber: String;
    isCheckedIn: Boolean;
    customerType: String;
    refrenceCustomerTypeId: String;
}
export {ICustomerUserModel};