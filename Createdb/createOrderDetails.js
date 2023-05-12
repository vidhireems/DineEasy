db = db.getSiblingDB('dineEasy')
db.createCollection('order')
restaurantCollection = db.getCollection("order")