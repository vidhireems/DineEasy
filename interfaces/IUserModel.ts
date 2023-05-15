//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface IUserModel extends Mongoose.Document {
    userId: String;
    name: String;
    email: String;
    Password: String;
    userType: String;
    refrenceUserTypeId: String;
}
export {IUserModel};