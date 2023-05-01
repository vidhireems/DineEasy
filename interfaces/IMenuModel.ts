//imports
import Mongoose = require("mongoose");


interface IMenuModel extends Mongoose.Document {
    restaurantId: Number,
    menuId: Number,
    name: String
}
export {IMenuModel};
