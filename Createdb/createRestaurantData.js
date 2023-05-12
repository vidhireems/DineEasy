// Connect to mongo
const conn = new Mongo();

// Connect to dineEasy DB
db = conn.getDB('dineEasy');

// Create collection if not already present
restaurantCollection = db.getCollection('restaurant') || db.createCollection('restaurant');

// Delete all the previous restaurant collection data
restaurantCollection.deleteMany({})

// Insert all the restaurant data to the DB
restaurantCollection.insertMany(
    [{
        resId: 1,
        name: "The Pink Door",
        image: "https://www.google.com/maps/place/The+Pink+Door/@47.6103652,-122.3425604,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNHbdQN3gFf5qZ7E5jSchhFbZmhsrEJpBUkXuRR!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNHbdQN3gFf5qZ7E5jSchhFbZmhsrEJpBUkXuRR%3Dw447-h298-k-no!7i2048!8i1365!4m9!3m8!1s0x54906ab2ce0e56f7:0xbaad6a1dd096642a!8m2!3d47.6103652!4d-122.3425604!10e5!14m1!1BCgIgAQ!16s%2Fm%2F021jbrg",
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
        resId: 2,
        name: "Terra Plata",
        image: "https://www.google.com/maps/place/Terra+Plata/@47.6144039,-122.3280596,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNzm46-ESPdP_7PDMbwMUw6bmVYqpVzMF0_Qa7K!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNzm46-ESPdP_7PDMbwMUw6bmVYqpVzMF0_Qa7K%3Dw86-h105-k-no!7i1080!8i1320!4m17!1m9!3m8!1s0x5490142f57d09697:0xe701da98e40fb962!2sTerra+Plata!8m2!3d47.6143982!4d-122.3280831!9m1!1b1!16s%2Fg%2F1tfzm0rq!3m6!1s0x5490142f57d09697:0xe701da98e40fb962!8m2!3d47.6143982!4d-122.3280831!10e5!16s%2Fg%2F1tfzm0rq",
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
        resId: 3,
        name: "Il Terrazzo Carmine",
        image: "https://www.google.com/maps/place/Il+Terrazzo+Carmine/@47.5987869,-122.3342658,3a,137.4y,90t/data=!3m8!1e2!3m6!1sAF1QipNlCW6l2ka6gcRbw6Pj-UuUFMpRiyh5Xd9DbM3W!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNlCW6l2ka6gcRbw6Pj-UuUFMpRiyh5Xd9DbM3W%3Dw128-h86-k-no!7i700!8i467!4m7!3m6!1s0x54906aa4ef6c4933:0x2a6cab680f56bf5d!8m2!3d47.5988117!4d-122.3345893!10e5!16s%2Fg%2F1tdfyf86",
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
        resId: 4,
        name: "Cinque Terre Ristorante",
        image: "https://www.google.com/maps/place/Cinque+Terre+Ristorante/@47.6150832,-122.3378182,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO1xC-3woRHpGCuKXxEGDhZritbW3ac1CbmNVjW!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO1xC-3woRHpGCuKXxEGDhZritbW3ac1CbmNVjW%3Dw152-h86-k-no!7i1500!8i845!4m7!3m6!1s0x5490154ba90a23d5:0xe1bef1f3a279a72e!8m2!3d47.6150536!4d-122.3380046!10e5!16s%2Fg%2F11bz0w_jj4",
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
        resId: 5,
        name: "The George",
        image: "https://www.google.com/maps/place/The+George/@47.6078945,-122.3332964,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNu71YsX-6v9ouuAW4UwDgtkdrWYzf0UVnT5u5G!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNu71YsX-6v9ouuAW4UwDgtkdrWYzf0UVnT5u5G%3Dw119-h86-k-no!7i1800!8i1291!4m7!3m6!1s0x54906bfc9b532c91:0xf42e1fc36b061cc8!8m2!3d47.6079914!4d-122.3338074!10e5!16s%2Fg%2F11sqz_k553",
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
