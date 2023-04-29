//Imports
import { App } from './App';

//Initialize the server and listen on port 8080
let server:any = new App().expressApp;
server.listen(8080);