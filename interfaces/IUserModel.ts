//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface IUserModel extends Mongoose.Document {
    id: String;
    name: String;
    Email: String;
    Password: String;
    User_Type: String;
    Refrence_User_Type_Id: String;
}
export {IUserModel};