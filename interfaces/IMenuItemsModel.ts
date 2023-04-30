import Mongoose = require("mongoose");

interface IMenuItemsModel extends Mongoose.Document {
   
    menuId: Number
    restaurantId: Number
    menu: [ {
            category: string;
            name: string;
            price: number;
            is_veg: boolean;
            ingredients: string;
    }];
}
export {IMenuItemsModel};


  