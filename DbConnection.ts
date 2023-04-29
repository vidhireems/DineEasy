import Mongoose from 'mongoose';

class DbConnection {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@127.0.0.1:27017/dineEasy?authSource=admin';
    
    constructor () {
        DbConnection.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DbConnection.connect();
export {DbConnection};