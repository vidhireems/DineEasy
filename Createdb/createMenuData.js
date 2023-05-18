// Connect to mongo
const conn = new Mongo();

// Connect to dineEasy DB
db = conn.getDB('dineEasy');

// Create collection if not already present
menuCollection = db.getCollection('menu') || db.createCollection('menu');

//Delete all the previous menu collection data
menuCollection.deleteMany({})

// Insert all the restaurant data to the DB
menuCollection.insertMany(
    [{
        resId: "1",
        menuId: "1",
        name: "Snacks"
    },
    {
        resId: "1",
        menuId: "2",
        name: "Lunch"
    },
    {
        resId: "1",
        menuId: "3",
        name: "Dinner"
    },
    {
        resId: "2",
        menuId: "4",
        name: "Snacks"
    },
    {
        resId: "2",
        menuId: "5",
        name: "Lunch"
    },
    {
        resId: "3",
        menuId: "6",
        name: "Lunch"
    },
    {
        resId: "4",
        menuId: "7",
        name: "Lunch"
    },
    {
        resId: "5",
        menuId: "8",
        name: "Lunch"
    }]
)


menuItemsCollection = db.getCollection('menuItems') || db.createCollection('menuItems').then(() => db.getCollection('menuItems'));
menuItemsCollection.deleteMany({})
menuItemsCollection.insertMany(
    [{
        menuId: "1",
        resId: "1",
        menu: [
            {
                itemId: "asdasdd",
                category: "Antipasti",
                name: "Crostini",
                price: 13.00,
                is_veg: true,
                ingredients: "grilled toasts topped with fava bean purée, Pecorino Toscano, mint"
            },
            {
                itemId: "asdadd",
                category: "Pasta & Risotto",
                name: "Spaghetti con Carciofi",
                price: 29.75,
                is_veg: true,
                ingredients: "fresh artichokes, parsley, garlic, bread crumbs & the finest olive oil"
            },
            {
                itemId: "asdaasdsdd",
                category: "Veg Starters",
                name: "Rigatoni and Mama's Meatballs",
                price: 20,
                is_veg: false,
                ingredients: "with marinara sauce and fresh basil"
            },
            {
                itemId: "asddd",
                category: "Pesce & Carne",
                name: "Chicken Parmigiana Italian-American Style",
                price: 27.50,
                is_veg: false,
                ingredients: "breaded chicken cutlets, fresh mozzarella, marinara ~ capellini aglio e olio ~ crispy eggplant"
            },
            {
                itemId: "asdasddwert",
                category: "Pesce & Carne",
                name: "Cioppino Pink Door",
                price: 24,
                is_veg: false,
                ingredients: "prawns, rock fish, mussels, clams and calamari in a spicy tomato and white wine broth"
            }
        ]
    },
    {
        menuId:"2",
        resId: "1",
        menu: [
            {
                itemId: "asdassdifiugydd",
                category: "Specials",
                name: "Beef Carpaccio",
                price: 18.00,
                is_veg: false,
                ingredients: "fennel, pink peppercorn crust, arugula, white truffle, parmigiano reggiano."
            },
            {
                itemId: "asdasoihnfgvdd",
                category: "Specials",
                name: "Local Roots Radish Plate",
                price: 16.00,
                is_veg: true,
                ingredients: "beet butter, wild onion butter, sea salt."
            },
            {
                itemId: "asdasasdfoiundd",
                category: "Starter",
                name: "House Made Potato Chips",
                price: 18.00,
                is_veg: true,
                ingredients: "truffled sea salt, pecorino-chive cream."
            },
            {
                itemId: "asdasoqiweurldd",
                category: "Land & Sea",
                name: "Muscovy Duck Breast",
                price: 17.00,
                is_veg: false,
                ingredients: "duck fat sweet potatoes, grilled belgian endive, blackberry demi-glace"
            },
            {
                itemId: "asdasdaklsjdfhoiud",
                category: "Land & Sea",
                name: "Roast Pig",
                price: 19.00,
                is_veg: false,
                ingredients: "manila clams, chorizo, sofrito, bay scented potato, hot smoked paprika, pickled red onions, chicharrons."
            }
        ]
    },
    {
        menuId:"3",
        resId: "1",
        menu: [
            {
                itemId: "asdasdosiadhhfvnkvjkd",
              category: "Specials",
              name: "Spaghettini Dell 'Ortolano",
              price: 18.99,
              is_veg: true,
              ingredients: "Tossed with fresh tomatoes, arugula, goat cheese and pinenuts"
            },
            {
                itemId: "asasdfiuyndasdd",
              category: "Specials",
              name: "Gnocchi Alla Sorrentina",
              price: 22.9,
              is_veg: true,
              ingredients: "Potato dumplings tossed with mozzarella cheese and tomato sauce"
            },
            {
                itemId: "asdqwoeiuksndvcasdd",
              category: "Specials",
              name: "Pennette Con Salmone",
              price: 24.00,
              is_veg: false,
              ingredients: "Tossed with house smoked salmon, peas, and a touch of cream sauce"
            }
        ]
    },    
    {
        menuId:"4",
        resId: "2",
        menu: [
            {
                itemId: "asdaaspodiasnvsdd",
              category: "Soups",
              name: "Daal Soup",
              price: 8.00,
              is_veg: true,
              ingredients: "Yellow lentil soup, basmati rice, ginger, garlic, cilantro, lemon wedge."
            },
            {
                itemId: "asdasdfoiuasdbasdd",
              category: "Salads",
              name: "Kachumber Salad",
              price: 7.00,
              is_veg: true,
              ingredients: "Indian chopped salad, tomatoes, cucumbers, red onions, lemon juice."
            },
            {
                itemId: "asdaasdfiuaysdsdd",
              category: "Main Dishes",
              name: "Achari Aloo",
              price: 16.00,
              is_veg: true,
              ingredients: "pickled potato curry, basmati rice."
            },
            {
                itemId: "asdasqwoiusavsdd",
              category: "Main Dishes",
              name: "Achari Aloo",
              price: 16.00,
              is_veg: true,
              ingredients: "Fried okra, tomatoes, onions, Indian spices, basmati rice"
            },
            {
                itemId: "asdaasdfoiuhacvsdd",
              category: "Main Dishes",
              name: "Coconut Curry",
              price: 16.00,
              is_veg: true,
              ingredients: "Coconut milk, house spices, basmati rice."
            }
        ]
    },
    {
        menuId: "5",
        resId: "2",
        menu: [
            {
                itemId: "asdasdoivasdd",
                category: "Appetizers",
                name: "Garlic Naan",
                price: 3.50,
                is_veg: true,
                ingredients: "Freshly baked bread topped with garlic and butter."
            },
            {
                itemId: "asdasdfpoiahvasdd",
                category: "Entrees",
                name: "Butter Chicken",
                price: 14.99,
                is_veg: false,
                ingredients: "Chicken cooked in creamy tomato sauce with a blend of Indian spices."
            },
            {
                itemId: "asasfawefdasasvaefdd",
                category: "Entrees",
                name: "Saag Paneer",
                price: 13.99,
                is_veg: true,
                ingredients: "Homemade cheese cooked with fresh spinach and spices."
            },
            {
                itemId: "asdqoiwuyeffamsbvasdd",
                category: "Desserts",
                name: "Rasmalai",
                price: 5.99,
                is_veg: true,
                ingredients: "Sweet cottage cheese balls soaked in saffron flavored milk."
            }
        ]
    },
    {
        menuId: "6",
        resId: "3",
        menu: [
            {
                itemId: "asdasoiquweyfasddd",
                category: "Appetizers",
                name: "Samosas",
                price: 5.00,
                is_veg: true,
                ingredients: "Crispy fried pastry stuffed with spiced potatoes and peas."
            },
            {
                itemId: "asdasasdofiyaudd",
                category: "Entrees",
                name: "Lamb Vindaloo",
                price: 17.99,
                is_veg: false,
                ingredients: "Lamb cooked in spicy tomato and vinegar sauce."
            },
            {
                itemId: "asdasasdfaksvjbefrdd",
                category: "Entrees",
                name: "Chana Masala",
                price: 12.99,
                is_veg: true,
                ingredients: "Chickpeas cooked in a blend of Indian spices with onions and tomatoes."
            },
            {
                itemId: "asdaawselkjasdvdsdd",
                category: "Desserts",
                name: "Gulab Jamun",
                price: 4.99,
                is_veg: true,
                ingredients: "Sweet milk dumplings soaked in sugar syrup flavored with cardamom and rose water."
            }
        ]
    },

    {
        menuId: "7",
        resId: "4",
        menu: [
            {
                itemId: "asdasagwrwgsegsegsdfdd",
                category: "Appetizers",
                name: "Veggie Pakoras",
                price: 5.99,
                is_veg: true,
                ingredients: "Assorted vegetables coated in chickpea batter and fried until crispy."
            },
            {
                itemId: "asdaasdkvjbaeuhdd",
                category: "Entrees",
                name: "Chicken Tikka Masala",
                price: 15.99,
                is_veg: false,
                ingredients: "Grilled chicken cooked in creamy tomato sauce with a blend of Indian spices."
            },
            {
                itemId: "asdasqowiufyelkjasbvdveadd",
                category: "Entrees",
                name: "Baingan Bharta",
                price: 13.99,
                is_veg: true,
                ingredients: "Roasted eggplant mashed and cooked with onions, tomatoes, and spices."
            },
            {
                itemId: "asdlkjfdyfoihbbjvrasdd",
                category: "Desserts",
                name: "Kulfi",
                price: 5.99,
                is_veg: true,
                ingredients: "Creamy frozen dessert flavored with pistachios, almonds, and cardamom."
            }
        ]
    },
    {
        menuId: "8",
        resId: "5",
        menu: [
            {
                itemId: "asdaasvlkjewayfsdd",
                category: "Appetizers",
                name: "Paneer Tikka",
                price: 8.99,
                is_veg: true,
                ingredients: "Chunks of cottage cheese marinated in yogurt and Indian spices, grilled to perfection."
            },
            {
                itemId: "asdaasflkajehiufysdd",
                category: "Entrees",
                name: "Butter Chicken",
                price: 16.99,
                is_veg: false,
                ingredients: "Tender chicken cooked in a rich and creamy tomato sauce, flavored with butter and spices."
            },
            {
                itemId: "asdasflkjaew4hofiufufhkahsadasdd",
                category: "Entrees",
                name: "Biryani",
                price: 14.99,
                is_veg: true,
                ingredients: "Basmati rice cooked with vegetables, spices, and herbs, served with raita."
            },
            {
                itemId: "asdasdaslkvjheoiuyed",
                category: "Desserts",
                name: "Gulab Jamun",
                price: 4.99,
                is_veg: true,
                ingredients: "Fried dough balls soaked in sugar syrup, flavored with cardamom and rosewater."
            }
        ]
    }]
)