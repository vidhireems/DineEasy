//imports
import Mongoose from "mongoose";

//Interface for restaurant model
interface IReservationModel extends Mongoose.Document {
  reservationId: String;
  customerId: String;
  resId: String;
  peopleCount: Number;
  status: String;
  checkInTime: Date;
  tableNumber: Number;
}
export { IReservationModel };
