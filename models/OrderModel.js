"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
class OrderModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            // id: Number,
            name: String,
            quantity: Number,
            itemName: String,
        }, { collection: "order", timestamps: true });
    }
    createModel() {
        this.model = mongooseConnection.model("order", this.schema);
    }
    // public async makeOrder(req: any, res: any): Promise<any> {
    //   try {
    //     const {  itemName,  } = req.body;
    //     const order = new this.model( itemName, );
    //     await order.save();
    //     res.status(200).json(order);
    //   } catch (err) {
    //     console.error(err);
    //     res.sendStatus(500);
    //   }
    // }
    createOrder(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, quantity, itemName } = request.body;
                if (!name || !quantity || !itemName) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                const order = new this.model({ name, quantity, itemName, });
                yield order.save();
                response.status(200).json({
                    message: "Order placed successfully", order
                });
            }
            catch (error) {
                console.error(error);
                console.log(error);
                response.sendStatus(500);
            }
        });
    }
}
exports.OrderModel = OrderModel;
