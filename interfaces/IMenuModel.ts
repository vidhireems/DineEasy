//imports
import Mongoose = require("mongoose");


interface IMenuModel extends Mongoose.Document {
    resId: String,
    menuId: String,
    name: String
}
export {IMenuModel};
