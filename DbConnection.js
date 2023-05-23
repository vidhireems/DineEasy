"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
//Imports 
const mongoose_1 = __importDefault(require("mongoose"));
//DbConnection helps in connecting to Mongodb 
class DbConnection {
<<<<<<< Updated upstream
    constructor() {
        DbConnection.connect(); //TODO: Consider removing this
=======
    // Function to set the environment (cloud or local)
    static setEnvironment(env) {
        DbConnection.environment = env;
>>>>>>> Stashed changes
    }
    //function to connect to Mongo Db 
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
<<<<<<< Updated upstream
=======
        // Handle localhost scenario
        const args = process.argv.slice(2);
        const envArgIndex = args.findIndex(arg => arg === '--env');
        if (envArgIndex !== -1 || args[envArgIndex + 1] === 'localhost' || DbConnection.environment == 'localhost') {
            this.DB_CONNECTION_STRING = `mongodb://localhost:${this.PORT}/dineEasy`;
        }
>>>>>>> Stashed changes
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = mongoose_1.default.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DbConnection = DbConnection;
<<<<<<< Updated upstream
DbConnection.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@127.0.0.1:27017/dineEasy?authSource=admin';
=======
DbConnection.DB_CONNECTION_STRING = 'mongodb+srv://dbAdmin:test@cluster0.lcc9vdm.mongodb.net/dineEasy';
DbConnection.PORT = '27017';
DbConnection.environment = '';
>>>>>>> Stashed changes
DbConnection.connect();
// clear models cache
Object.keys(DbConnection.mongooseConnection.models).forEach(modelName => {
    delete DbConnection.mongooseConnection.models[modelName];
});
