"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbConnection_1 = require("./DbConnection");
var express = require("express");
var app = express();
var port = 3000;
app.use(express.json());
app.listen(port, function () { return console.log("Example app listening on port ".concat(port, "!")); });
var dbConnection = new DbConnection_1.DbConnection();
DbConnection_1.DbConnection.mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
DbConnection_1.DbConnection.mongooseConnection.once('open', function () {
    console.log('Connected to MongoDB');
    DbConnection_1.DbConnection.mongooseConnection.close();
});
