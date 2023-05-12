//imports
import Mongoose from 'mongoose';

//Interface for restaurant model
interface IReservationModel extends Mongoose.Document {
    id: String;
    time: String;
    peopleCount: Number;
    status: String;
    CheckInTime: String;
    PremCustomerId: String;
    RestaurantId: String;
}
export {IReservationModel};