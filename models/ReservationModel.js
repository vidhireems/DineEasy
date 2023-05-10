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
const bcrypt = require('bcrypt');
//Mongoose connections and object
let mongooseConnection = DbConnection_1.DbConnection.mongooseConnection;
let mongooseObj = DbConnection_1.DbConnection.mongooseInstance;
//Class for restaurant model
class ReservationModel {
    //constructor initilize the create schema and model
    constructor() {
        this.createSchema();
        this.createModel();
    }
    //function to create the schema for restaurants
    createSchema() {
        this.schema = new mongoose_1.default.Schema({
            id: String,
            time: String,
            peopleCount: Number,
            status: String,
            CheckInTime: String,
            PremCustomerId: String,
            RestaurantId: String,
        }, { collection: 'Reservation' });
    }
    //function to create model for the User interface and schema
    createModel() {
        this.model = mongooseConnection.model("Reservation", this.schema);
    }
    // function for retriving specific user Reservation
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
                response.sendStatus(500).send({ message: "Internal server error while retrieving User Reservation" });
            }
        });
    }
}
exports.ReservationModel = ReservationModel;
