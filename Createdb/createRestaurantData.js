// Connect to dineEasy DB
db = db.getSiblingDB('dineEasy');

// Create collection if not already present
restaurantCollection = db.getCollection('restaurant') || db.createCollection('restaurant');

// Delete all the previous restaurant collection data
restaurantCollection.deleteMany({})

// Insert all the restaurant data to the DB
restaurantCollection.insertMany(
    [{
        resId: "1",
        name: "The Pink Door",
        image: "https://images.squarespace-cdn.com/content/v1/574335cf59827e45443e86b7/1503899718746-9L4CLEPKJST64L2O1VN0/4A3A4021.jpg",
        location: "1919 post alley , Seattle, WA 98104",
        rating: 4.4,
        reviews: 2000,
        cost: "30$ - 50$",
        cuisines: "Italian",
        contact: "(206) 683-0000",
        neighborhood: "Belltown / Pike Place Market",
        hours: "Till 10:00 PM",
        parkingdetails: "Public Pay Lot: The Pike Place Public Market Parking Garage - w/ easy access to the Market! Street parking is free after 8:00 p.m. M-F. Free on Sundays! Many Private Pay Lots nearby. ",
        isValetPark: true,
        numberOfTables: 20
    },
    {
        resId: "2",
        name: "Terra Plata",
        image: "https://images.squarespace-cdn.com/content/v1/5e3879631cec6d405f5950ec/1584468477379-39A5033VOJMMS7CZ5ROZ/rooftopsummer.jpg",
        location: "1051 Melrose Ave, Seattle, WA 98124",
        rating: 4.7,
        reviews: 983,
        cost: "20$ - 30$",
        cuisines: "Farm-to-table, Mediterranean",
        contact: "(425) 641-9997",
        neighborhood: "Capitol Hill / First Hill",
        hours: "Open till 12:00 PM",
        parkingdetails: "There is street parking surrounding the restaurant and five parking lots located within two blocks of Terra Platae.",
        isValetPark: false,
        numberOfTables: 10,
    },
    {
        resId: "3",
        name: "Il Terrazzo Carmine",
        image: "https://www.ilterrazzocarmine.com/img/gallery-v3/gallery-3.jpg",
        location: "411 1st Ave S, Seattle, WA 98104",
        rating: 3.8,
        reviews: 1685,
        cost: "20$ - 30$",
        cuisines: "Italian",
        contact: "(425) 677-8880",
        neighborhood: "Downtown",
        hours: "Open till 9:00 PM",
        parkingdetails: "Onsite open parking space available.",
        isValetPark: true,
        numberOfTables: 15,
    },
    {
        resId: "4",
        name: "Cinque Terre Ristorante",
        image: "https://images.squarespace-cdn.com/content/v1/5616b059e4b07744e820b678/1513370540169-O9ELV3KY7XY89NJYO3VD/Interior+Compressed-3.jpg",
        location: "2001 Westlake Ave, Seattle, WA 981214",
        rating: 4.0,
        reviews: 861,
        cost: "50$ - 100$",
        cuisines: "Indian",
        contact: "(425) 820-2303",
        neighborhood: "Juanita Village Retail",
        hours: "Open till 10:00 PM",
        parkingdetails: " ",
        isValetPark: false,
        numberOfTables: 7,
    },
    {
        resId: "5",
        name: "The George",
        image: "https://www.fairmont.com/assets/0/104/3081/3086/4231/4232/0273a866-109f-4179-8903-4f580a1845c6.jpg",
        location: "411 University St, Seattle, WA 98101",
        rating: 4.2,
        reviews: 567,
        cost: "50$ - 60$",
        cuisines: "Contemporary American, Northwest, American",
        contact: "(206)709 0111",
        neighborhood: "Downtown",
        hours: "Open till 9:45 PM",
        parkingdetails: " Public Lot",
        isValetPark: true,
        numberOfTables: 10,
    }]
)
