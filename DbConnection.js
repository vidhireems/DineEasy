"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
var mongoose_1 = require("mongoose");
var DbConnection = /** @class */ (function () {
    function DbConnection() {
        DbConnection.connect();
    }
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
    DbConnection.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@localhost:27017/dineEasy?authSource=admin';
    return DbConnection;
}());
exports.DbConnection = DbConnection;
DbConnection.connect();
