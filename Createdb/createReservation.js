// Connect to dineEasy DB
db = db.getSiblingDB('dineEasy');

// Create collection if not already present
orderCollection = db.getCollection('reservation') || db.createCollection('reservation');
