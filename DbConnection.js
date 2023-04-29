"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DbConnection {
    constructor() {
        DbConnection.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = mongoose_1.default.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DbConnection = DbConnection;
DbConnection.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@127.0.0.1:27017/dineEasy?authSource=admin';
DbConnection.connect();
