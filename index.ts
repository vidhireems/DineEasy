import { DbConnection } from "./DbConnection";
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const dbConnection = new DbConnection();
DbConnection.mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
DbConnection.mongooseConnection.once('open', () => {
console.log('Connected to MongoDB');
DbConnection.mongooseConnection.close();
});