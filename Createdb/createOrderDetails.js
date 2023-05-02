// Connect to mongo
const conn = new Mongo();

// Connect to dineEasy DB
db = conn.getDB('dineEasy');

// Create collection if not already present
orderCollection = db.getCollection('order') || db.createCollection('order');
