//Imports 
import Mongoose from 'mongoose';

//DbConnection helps in connecting to Mongodb 
class DbConnection {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
<<<<<<< Updated upstream
    static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@127.0.0.1:27017/dineEasy?authSource=admin';
    
    constructor () {
        DbConnection.connect(); //TODO: Consider removing this
    }
    
=======
    static DB_CONNECTION_STRING:string = 'mongodb+srv://dbAdmin:test@cluster0.lcc9vdm.mongodb.net/dineEasy';
    static PORT:string = '27017';
    static environment:string = '';

    // Function to set the environment (cloud or local)
    static setEnvironment(env: string): void {
        DbConnection.environment = env;
    }

>>>>>>> Stashed changes
    //function to connect to Mongo Db 
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
<<<<<<< Updated upstream
=======

        // Handle localhost scenario
        const args = process.argv.slice(2);
        const envArgIndex = args.findIndex(arg => arg === '--env');
        if(envArgIndex !== -1 || args[envArgIndex + 1] === 'localhost' || DbConnection.environment  == 'localhost')
        {
            this.DB_CONNECTION_STRING = `mongodb://localhost:${this.PORT}/dineEasy`;
        }
        
>>>>>>> Stashed changes
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DbConnection.connect();

// clear models cache
Object.keys(DbConnection.mongooseConnection.models).forEach(modelName => {
    delete (DbConnection.mongooseConnection.models as { [key: string]: any })[modelName];
  });
  
export {DbConnection};