"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
//Imports 
var mongoose_1 = require("mongoose");
//DbConnection helps in connecting to Mongodb 
var DbConnection = /** @class */ (function () {
    function DbConnection() {
        DbConnection.connect(); //TODO: Consider removing this
    }
    //function to connect to Mongo Db 
    DbConnection.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = mongoose_1.default.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    DbConnection.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@127.0.0.1:27017/dineEasy?authSource=admin';
    return DbConnection;
}());
exports.DbConnection = DbConnection;
DbConnection.connect();
