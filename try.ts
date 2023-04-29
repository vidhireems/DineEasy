import { DbConnection } from "./DbConnection";
const dbConnection = new DbConnection();
DbConnection.mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
DbConnection.mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  DbConnection.mongooseConnection.close();
});