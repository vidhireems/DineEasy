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
exports.ReservationModel = void 0;
//Imports
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection_1 = require("../DbConnection");
const uuid_1 = require("uuid");
const RestaurantModel_1 = require("./RestaurantModel");
const node_cron_1 = __importDefault(require("node-cron"));
const CustomerUserModel_1 = require("./CustomerUserModel");
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
class ReservationModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
        this.restaurantModel = new RestaurantModel_1.RestaurantModel();
        this.customeruserModel = new CustomerUserModel_1.CustomerUserModel();
        node_cron_1.default.schedule("1 0 * * *", this.resetTableCount.bind(this));
    }
    //function to create the schema for restaurants
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            reservationId: {
                type: String,
                required: true,
                unique: true,
            },
            customerId: String,
            resId: String,
            date: Date,
            time: String,
            peopleCount: Number,
            phoneNumber: String,
            tableNumber: Number,
            status: {
                type: String,
                enum: ['confirmed', 'pending', 'cancelled'],
                default: 'pending'
            },
        }, { collection: "Reservation" });
    }
    //function to create model for the User interface and schema
    createModel() {
        this.model = mongooseConnection.model("Reservation", this.schema);
    }
    resetTableCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield this.restaurantModel.model.find({});
                for (const restaurant of restaurants) {
                    const originalTableCount = restaurant.originalNumberOfTables;
                    restaurant.numberOfTables = originalTableCount;
                    yield restaurant.save();
                }
                console.log("Table count reset successfully.");
            }
            catch (error) {
                console.error("Error occurred while resetting table count:", error);
            }
        });
    }
    retrieveUserReservation(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.model.findOne(filter);
                query.then((UserDetail) => {
                    if (!UserDetail) {
                        console.error({ error: "Unable to find User Reservation" });
                        response.status(404).send({ error: "Reservation not found" });
                    }
                    else {
                        response.send(UserDetail);
                    }
                });
            }
            catch (err) {
                console.error(err);
                response.sendStatus(500).send({
                    message: "Internal server error while retrieving User Reservation",
                });
            }
        });
    }
    // add reservation
    // add reservation
    createReservation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationId = (0, uuid_1.v4)();
                const { resId, customerId, date, time, peopleCount, phoneNumber } = request.body;
                if (!resId || !customerId || !date || !time || !peopleCount || !phoneNumber) {
                    return response.status(400).json({ message: "Please fill all fields" });
                }
                const restaurant = yield this.restaurantModel.model.findOne({ resId });
                if (!restaurant) {
                    return response.status(404).json({ message: "Restaurant not found" });
                }
                if (restaurant.numberOfTables <= 0) {
                    return response.status(400).json({ message: "Cannot reserve. No tables available" });
                }
                const customer = yield this.customeruserModel.model.findOne({ customerId });
                if (!customer) {
                    return response.status(404).json({ message: "Customer not found" });
                }
                let tableNumber = getRandomInt(1, restaurant.numberOfTables);
                const maxAttempts = restaurant.numberOfTables;
                let attempts = 0;
                while (attempts < maxAttempts) {
                    const existingReservation = yield this.model.findOne({
                        resId,
                        tableNumber,
                        status: { $ne: "canceled" },
                    });
                    if (!existingReservation) {
                        break;
                    }
                    tableNumber = getRandomInt(1, restaurant.numberOfTables);
                    attempts++;
                }
                if (attempts === maxAttempts) {
                    return response.status(400).json({ message: "Cannot reserve. No tables available" });
                }
                const checkInTime = new Date(`${date} ${time}`);
                const reservation = new this.model({
                    customerId,
                    reservationId,
                    resId,
                    date,
                    time,
                    peopleCount,
                    phoneNumber,
                    status: "confirmed",
                    tableNumber,
                });
                yield reservation.save();
                restaurant.numberOfTables -= 1;
                yield restaurant.save();
                response.status(200).json({
                    message: "Reservation created successfully",
                    reservation: {
                        reservationId,
                        customerId,
                        tableNumber,
                        status: "confirmed",
                        date,
                        time,
                        peopleCount,
                        phoneNumber,
                    },
                });
            }
            catch (error) {
                console.error(error);
                response.sendStatus(500);
            }
        });
    }
    // get all reservations
    getAllReservations(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allReservations = yield this.model.find();
                return response.json(allReservations);
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ message: "Failed to retrieve reservations" });
            }
        });
    }
    // update reservation
    updateReservation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, reservationId, peopleCount, date, time } = request.body;
                if (!reservationId || !customerId) {
                    return response
                        .status(400)
                        .json({ message: "Missing customer ID or reservation ID" });
                }
                const reservation = yield this.model.findOne({ reservationId });
                if (!reservation) {
                    return response.status(404).json({ message: "Reservation not found" });
                }
                if (peopleCount !== undefined) {
                    reservation.peopleCount = peopleCount;
                }
                if (date !== undefined) {
                    reservation.date = new Date(date);
                }
                if (time !== undefined) {
                    reservation.time = time;
                }
                yield reservation.save();
                response
                    .status(200)
                    .json({ message: "Reservation updated successfully", reservation });
            }
            catch (error) {
                console.error(error);
                response.sendStatus(500);
            }
        });
    }
    // cancel reservation
    cancelReservation(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservationId } = request.params;
                const canceledReservation = yield this.model.findOneAndUpdate({ reservationId }, { status: "canceled" }, { new: true }).select("resId");
                if (!canceledReservation) {
                    return response.status(404).json({ message: "Reservation not found" });
                }
                const RestaurantModel = mongoose_1.default.model("Restaurant"); // Assuming the name of the Restaurant model is "Restaurant"
                yield RestaurantModel.updateOne({ resId: canceledReservation.resId }, { $inc: { numberOfTables: 1 } });
                return response.status(200).json({
                    message: "Reservation canceled successfully",
                    reservation: canceledReservation,
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    message: "Internal server error while canceling reservation",
                });
            }
        });
    }
}
exports.ReservationModel = ReservationModel;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
