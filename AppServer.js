"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const App_1 = require("./App");
//Initialize the server and listen on port 8080
let server = new App_1.App().expressApp;
console.log("App Server listening on port 8080");
server.listen(8080);
