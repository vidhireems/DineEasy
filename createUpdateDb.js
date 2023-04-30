"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var path = require("path");
var host = "localhost";
var port = "27017";
var user = "dbAdmin";
var password = "test";
var authenticationDB = "admin";
var database = "dineEasy";
var collectionScriptDirectory = "CreateDb";
var createUserFile = "adminDbUser.js";
var updateCollectionFiles = ["createRestaurantData.js"];
// User with correct privilieges must be created before updating databases
var pathToScript = path.join(collectionScriptDirectory, createUserFile);
var command = "mongosh --host ".concat(host, " --port ").concat(port, " ").concat(authenticationDB, " ").concat(pathToScript);
var createUserResult = child_process.spawnSync(command, { shell: true });
if (createUserResult.status !== 0) {
    console.error("Error running script ".concat(pathToScript, ": ").concat(createUserResult.stderr.toString()));
}
else {
    console.log(createUserResult.stdout.toString().trim());
}
// Populate data in the collections of database
updateCollectionFiles.forEach(function (updateCollectionFile) {
    var pathToScript = path.join(collectionScriptDirectory, updateCollectionFile);
    console.log("Running script ".concat(pathToScript, "..."));
    var command = "mongosh --host ".concat(host, " --port ").concat(port, " -u ").concat(user, " -p ").concat(password, " --authenticationDatabase ").concat(authenticationDB, " ").concat(database, " ").concat(pathToScript);
    var updateCollectionresult = child_process.spawnSync(command, { shell: true });
    if (updateCollectionresult.status !== 0) {
        console.error("Error running script ".concat(pathToScript, ": ").concat(updateCollectionresult.stderr.toString()));
    }
    else {
        console.log(updateCollectionresult.stdout.toString().trim());
    }
});
