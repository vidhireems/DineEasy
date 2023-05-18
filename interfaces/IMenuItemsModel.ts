import Mongoose = require("mongoose");

interface IMenuItemsModel extends Mongoose.Document {
   
    menuId: String
    resId: String
    menu: [ {
            itemId: String;
            category: String;
            name: String;
            price: number;
            is_veg: boolean;
            ingredients: String;
    }];
}
export {IMenuItemsModel};


  