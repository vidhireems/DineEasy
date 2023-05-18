//imports
import Mongoose from "mongoose";

//Interface for reservation model
interface IReservationModel extends Mongoose.Document {
  reservationId: String;
  customerId: String;
  resId: String;
  date: Date;
  time: String;
  peopleCount: Number;
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  phoneNumber: String,
  tableNumber: Number;
}
export { IReservationModel };
