//Imports
import { App } from './App';
import { DbConnection } from './DbConnection';


// Handle localhost scenario
const args = process.argv.slice(2);
const envArgIndex = args.findIndex(arg => arg === '--env');
if(envArgIndex !== -1 || args[envArgIndex + 1] === 'localhost')
{
    // Set the environment to indicate the use of the local database
    DbConnection.setEnvironment('localhost');
}

//Initialize the server and listen on port 8080
let server:any = new App().expressApp;
console.log("App Server listening on port 8080");
server.listen(8080);
