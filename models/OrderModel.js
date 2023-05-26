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
const uuid_1 = require("uuid");
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
class OrderModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            orderId: String,
            resId: String,
            customerId: String,
            orderDate: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                default: "Received"
            },
            orderType: {
                type: String,
                default: "Normal"
            },
            quantity: Number,
            itemIds: [String],
        }, { collection: "order" });
    }
    createModel() {
        this.model = mongooseConnection.model("order", this.schema);
    }
    //post create order complete this 
    createOrder(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = (0, uuid_1.v4)();
                const restaurantId = request.params.resId;
                console.log(orderId, restaurantId);
                const { customerId, quantity, itemIds } = request.body;
                console.log({ customerId, quantity, itemIds });
                // Check if all required fields are provided
                if (!customerId || !quantity || !itemIds) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                const order = new this.model({
                    orderId,
                    resId: restaurantId,
                    customerId,
                    quantity,
                    itemIds,
                });
                yield order.save();
                response.status(200).json({
                    message: "Order placed successfully",
                    order: {
                        orderId,
                        resId: restaurantId,
                        customerId,
                        orderDate: Date.now,
                        status: "Received",
                        orderType: "Normal",
                        quantity,
                        itemIds,
                    },
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
