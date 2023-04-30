//Imports
import { App } from './App';

//Initialize the server and listen on port 8080
let server:any = new App().expressApp;
console.log("App Server listening on port 3000");
server.listen(3000);