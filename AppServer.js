"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const App_1 = require("./App");
const DbConnection_1 = require("./DbConnection");
// Handle localhost scenario
const args = process.argv.slice(2);
const envArgIndex = args.findIndex(arg => arg === '--env');
if (envArgIndex !== -1 || args[envArgIndex + 1] === 'localhost') {
    // Set the environment to indicate the use of the local database
    DbConnection_1.DbConnection.setEnvironment('localhost');
}
//Initialize the server and listen on port 8080
let server = new App_1.App().expressApp;
console.log("App Server listening on port 8080");
server.listen(8080);
