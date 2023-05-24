// Connect to dineEasy DB
db = db.getSiblingDB("dineEasy");

// Create collection if not already present
menuCollection = db.getCollection("menu") || db.createCollection("menu");

//Delete all the previous menu collection data
menuCollection.deleteMany({});

// Insert all the restaurant data to the DB
menuCollection.insertMany([
  {
    resId: "1",
    menuId: "1",
    name: "Snacks",
  },
  {
    resId: "1",
    menuId: "2",
    name: "Lunch",
  },
  {
    resId: "1",
    menuId: "3",
    name: "Dinner",
  },
  {
    resId: "2",
    menuId: "4",
    name: "Snacks",
  },
  {
    resId: "2",
    menuId: "5",
    name: "Lunch",
  },
  {
    resId: "3",
    menuId: "6",
    name: "Lunch",
  },
  {
    resId: "4",
    menuId: "7",
    name: "Lunch",
  },
  {
    resId: "5",
    menuId: "8",
    name: "Lunch",
  },
  {
    resId: "6",
    menuId: "9",
    name: "Dinner",
  },
  {
    resId: "7",
    menuId: "10",
    name: "Lunch",
  },
  {
    resId: "7",
    menuId: "11",
    name: "Dinner",
  },
  {
    resId: "7",
    menuId: "12",
    name: "Brunch",
  },
  {
    resId: "8",
    menuId: "13",
    name: "Dinner",
  },
  {
    resId: "9",
    menuId: "14",
    name: "Food and Drinks",
  },
  {
    resId: "10",
    menuId: "15",
    name: "Dinner",
  },
  {
    resId: "10",
    menuId: "16",
    name: "Brunch",
  },
  {
    resId: "11",
    menuId: "17",
    name: "Food",
  },
  {
    resId: "12",
    menuId: "18",
    name: "Dinner",
  },
]);

menuItemsCollection =
  db.getCollection("menuItems") ||
  db.createCollection("menuItems").then(() => db.getCollection("menuItems"));
menuItemsCollection.deleteMany({});
menuItemsCollection.insertMany([
  {
    menuId: "1",
    resId: "1",
    menu: [
      {
        itemId: "asdasdd",
        category: "Antipasti",
        name: "Crostini",
        price: 13.0,
        is_veg: true,
        ingredients:
          "grilled toasts topped with fava bean purée, Pecorino Toscano, mint",
      },
      {
        itemId: "asdadd",
        category: "Pasta & Risotto",
        name: "Spaghetti con Carciofi",
        price: 29.75,
        is_veg: true,
        ingredients:
          "fresh artichokes, parsley, garlic, bread crumbs & the finest olive oil",
      },
      {
        itemId: "asdaasdsdd",
        category: "Veg Starters",
        name: "Rigatoni and Mama's Meatballs",
        price: 20,
        is_veg: false,
        ingredients: "with marinara sauce and fresh basil",
      },
      {
        itemId: "asddd",
        category: "Pesce & Carne",
        name: "Chicken Parmigiana Italian-American Style",
        price: 27.5,
        is_veg: false,
        ingredients:
          "breaded chicken cutlets, fresh mozzarella, marinara ~ capellini aglio e olio ~ crispy eggplant",
      },
      {
        itemId: "asdasddwert",
        category: "Pesce & Carne",
        name: "Cioppino Pink Door",
        price: 24,
        is_veg: false,
        ingredients:
          "prawns, rock fish, mussels, clams and calamari in a spicy tomato and white wine broth",
      },
    ],
  },
  {
    menuId: "2",
    resId: "1",
    menu: [
      {
        itemId: "asdassdifiugydd",
        category: "Specials",
        name: "Beef Carpaccio",
        price: 18.0,
        is_veg: false,
        ingredients:
          "fennel, pink peppercorn crust, arugula, white truffle, parmigiano reggiano.",
      },
      {
        itemId: "asdasoihnfgvdd",
        category: "Specials",
        name: "Local Roots Radish Plate",
        price: 16.0,
        is_veg: true,
        ingredients: "beet butter, wild onion butter, sea salt.",
      },
      {
        itemId: "asdasasdfoiundd",
        category: "Starter",
        name: "House Made Potato Chips",
        price: 18.0,
        is_veg: true,
        ingredients: "truffled sea salt, pecorino-chive cream.",
      },
      {
        itemId: "asdasoqiweurldd",
        category: "Land & Sea",
        name: "Muscovy Duck Breast",
        price: 17.0,
        is_veg: false,
        ingredients:
          "duck fat sweet potatoes, grilled belgian endive, blackberry demi-glace",
      },
      {
        itemId: "asdasdaklsjdfhoiud",
        category: "Land & Sea",
        name: "Roast Pig",
        price: 19.0,
        is_veg: false,
        ingredients:
          "manila clams, chorizo, sofrito, bay scented potato, hot smoked paprika, pickled red onions, chicharrons.",
      },
    ],
  },
  {
    menuId: "3",
    resId: "1",
    menu: [
      {
        itemId: "asdasdosiadhhfvnkvjkd",
        category: "Specials",
        name: "Spaghettini Dell 'Ortolano",
        price: 18.99,
        is_veg: true,
        ingredients:
          "Tossed with fresh tomatoes, arugula, goat cheese and pinenuts",
      },
      {
        itemId: "asasdfiuyndasdd",
        category: "Specials",
        name: "Gnocchi Alla Sorrentina",
        price: 22.9,
        is_veg: true,
        ingredients:
          "Potato dumplings tossed with mozzarella cheese and tomato sauce",
      },
      {
        itemId: "asdqwoeiuksndvcasdd",
        category: "Specials",
        name: "Pennette Con Salmone",
        price: 24.0,
        is_veg: false,
        ingredients:
          "Tossed with house smoked salmon, peas, and a touch of cream sauce",
      },
    ],
  },
  {
    menuId: "4",
    resId: "2",
    menu: [
      {
        itemId: "asdaaspodiasnvsdd",
        category: "Soups",
        name: "Daal Soup",
        price: 8.0,
        is_veg: true,
        ingredients:
          "Yellow lentil soup, basmati rice, ginger, garlic, cilantro, lemon wedge.",
      },
      {
        itemId: "asdasdfoiuasdbasdd",
        category: "Salads",
        name: "Kachumber Salad",
        price: 7.0,
        is_veg: true,
        ingredients:
          "Indian chopped salad, tomatoes, cucumbers, red onions, lemon juice.",
      },
      {
        itemId: "asdaasdfiuaysdsdd",
        category: "Main Dishes",
        name: "Achari Aloo",
        price: 16.0,
        is_veg: true,
        ingredients: "pickled potato curry, basmati rice.",
      },
      {
        itemId: "asdasqwoiusavsdd",
        category: "Main Dishes",
        name: "Achari Aloo",
        price: 16.0,
        is_veg: true,
        ingredients:
          "Fried okra, tomatoes, onions, Indian spices, basmati rice",
      },
      {
        itemId: "asdaasdfoiuhacvsdd",
        category: "Main Dishes",
        name: "Coconut Curry",
        price: 16.0,
        is_veg: true,
        ingredients: "Coconut milk, house spices, basmati rice.",
      },
    ],
  },
  {
    menuId: "5",
    resId: "2",
    menu: [
      {
        itemId: "asdasdoivasdd",
        category: "Appetizers",
        name: "Garlic Naan",
        price: 3.5,
        is_veg: true,
        ingredients: "Freshly baked bread topped with garlic and butter.",
      },
      {
        itemId: "asdasdfpoiahvasdd",
        category: "Entrees",
        name: "Butter Chicken",
        price: 14.99,
        is_veg: false,
        ingredients:
          "Chicken cooked in creamy tomato sauce with a blend of Indian spices.",
      },
      {
        itemId: "asasfawefdasasvaefdd",
        category: "Entrees",
        name: "Saag Paneer",
        price: 13.99,
        is_veg: true,
        ingredients: "Homemade cheese cooked with fresh spinach and spices.",
      },
      {
        itemId: "asdqoiwuyeffamsbvasdd",
        category: "Desserts",
        name: "Rasmalai",
        price: 5.99,
        is_veg: true,
        ingredients:
          "Sweet cottage cheese balls soaked in saffron flavored milk.",
      },
    ],
  },
  {
    menuId: "6",
    resId: "3",
    menu: [
      {
        itemId: "asdasoiquweyfasddd",
        category: "Appetizers",
        name: "Samosas",
        price: 5.0,
        is_veg: true,
        ingredients:
          "Crispy fried pastry stuffed with spiced potatoes and peas.",
      },
      {
        itemId: "asdasasdofiyaudd",
        category: "Entrees",
        name: "Lamb Vindaloo",
        price: 17.99,
        is_veg: false,
        ingredients: "Lamb cooked in spicy tomato and vinegar sauce.",
      },
      {
        itemId: "asdasasdfaksvjbefrdd",
        category: "Entrees",
        name: "Chana Masala",
        price: 12.99,
        is_veg: true,
        ingredients:
          "Chickpeas cooked in a blend of Indian spices with onions and tomatoes.",
      },
      {
        itemId: "asdaawselkjasdvdsdd",
        category: "Desserts",
        name: "Gulab Jamun",
        price: 4.99,
        is_veg: true,
        ingredients:
          "Sweet milk dumplings soaked in sugar syrup flavored with cardamom and rose water.",
      },
    ],
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
        ingredients:
          "Assorted vegetables coated in chickpea batter and fried until crispy.",
      },
      {
        itemId: "asdaasdkvjbaeuhdd",
        category: "Entrees",
        name: "Chicken Tikka Masala",
        price: 15.99,
        is_veg: false,
        ingredients:
          "Grilled chicken cooked in creamy tomato sauce with a blend of Indian spices.",
      },
      {
        itemId: "asdasqowiufyelkjasbvdveadd",
        category: "Entrees",
        name: "Baingan Bharta",
        price: 13.99,
        is_veg: true,
        ingredients:
          "Roasted eggplant mashed and cooked with onions, tomatoes, and spices.",
      },
      {
        itemId: "asdlkjfdyfoihbbjvrasdd",
        category: "Desserts",
        name: "Kulfi",
        price: 5.99,
        is_veg: true,
        ingredients:
          "Creamy frozen dessert flavored with pistachios, almonds, and cardamom.",
      },
    ],
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
        ingredients:
          "Chunks of cottage cheese marinated in yogurt and Indian spices, grilled to perfection.",
      },
      {
        itemId: "asdaasflkajehiufysdd",
        category: "Entrees",
        name: "Butter Chicken",
        price: 16.99,
        is_veg: false,
        ingredients:
          "Tender chicken cooked in a rich and creamy tomato sauce, flavored with butter and spices.",
      },
      {
        itemId: "asdasflkjaew4hofiufufhkahsadasdd",
        category: "Entrees",
        name: "Biryani",
        price: 14.99,
        is_veg: true,
        ingredients:
          "Basmati rice cooked with vegetables, spices, and herbs, served with raita.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Desserts",
        name: "Gulab Jamun",
        price: 4.99,
        is_veg: true,
        ingredients:
          "Fried dough balls soaked in sugar syrup, flavored with cardamom and rosewater.",
      },
    ],
  },
  {
    menuId: "9",
    resId: "6",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "MEZE STARTERS",
        name: "Marinated Olives",
        price: 7,
        is_veg: true,
        ingredients: "spice mix, orange zest, fresh herbs",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: " SALADS & SIDES",
        name: "Spring Chopped Salad ",
        price: 16,
        is_veg: true,
        ingredients:
          "mixed lettuces, chickpea, tomato, fennel, peppers, red onion, graviera cheese, puffed wheat berry",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "ENTREES",
        name: "Beef & Lamb Keftedaki",
        price: 20,
        is_veg: false,
        ingredients:
          "grilled meatballs, tomato jam, lemon yogurt parsley salad",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "ENTREES",
        name: "Chickpea Falafel Plate ",
        price: 24,
        is_veg: false,
        ingredients:
          "eggplant, soft boiled egg, pickled red cabbage, pickled jalapeño, lemon tahini sauce",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "SALADS & SIDES",
        name: "Heirloom Tomato Salad",
        price: 19,
        is_veg: true,
        ingredients:
          "grilled sweet onion, tomato-basil vinaigrette, feta cheese, mint ",
      },
    ],
  },
  {
    menuId: "10",
    resId: "7",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "APPETIZERS",
        name: "SALSA TRIO (V*)",
        price: 7,
        is_veg: true,
        ingredients:
          "Pico de gallo, tomato jalapeño, and tomatillo salsa served with chips cooked in rice oil.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: " APPETIZERS",
        name: "JALAPEÑO QUESO (S, V) ",
        price: 7,
        is_veg: true,
        ingredients:
          "House-made queso sauce served with chips cooked in rice oil. add house-made chorizo",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "SOUPS & SALADS",
        name: "CHICKEN TORTILLA SOUP (S)",
        price: 14,
        is_veg: false,
        ingredients:
          "Pasilla chile chicken broth, tinga marinated chicken breast, crispy tortilla strips, diced onions, avocado, cotija cheese, cilantro, and lime.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "LUNCH PLATOS",
        name: "AL PASTOR TACOS (S)",
        price: 17,
        is_veg: false,
        ingredients:
          "Marinated grilled pork, avocado salsa, pineapple, diced onion, cilantro, habanero hot sauce.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "LUNCH PLATOS",
        name: "QUESADILLA (V, G)",
        price: 19,
        is_veg: true,
        ingredients:
          "Monterey cheese in a flour tortilla. Topped with guajillo crema, pico de gallo, and cilantro.",
      },
    ],
  },
  {
    menuId: "11",
    resId: "7",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "APPETIZERS",
        name: "GRILLED CORN ESQUITES (V)",
        price: 12,
        is_veg: true,
        ingredients:
          "Corn grilled and sliced off the cob, crema, cotija, Japanese mayonnaise, chile powder and lime.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "SOUPS & SALADS",
        name: "HOUSE SALAD",
        price: 8,
        is_veg: true,
        ingredients:
          "Mixed greens, shaved cucumber, carrot, cherry & grape tomatoes in a honey-lime-serrano vinaigrette.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "TACOS",
        name: "KALE MUSHROOM",
        price: 17,
        is_veg: true,
        ingredients:
          "Spicy kale and sautéed mushrooms, crema, and cotija cheese.",
      },
    ],
  },
  {
    menuId: "12",
    resId: "7",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "BREAKFAST",
        name: "CHILAQUILES",
        price: 12,
        is_veg: true,
        ingredients:
          "House-made tortilla chips tossed in your choice of roasted-tomato-jalapeño sauce or tomatillo sauce. Topped with two free-range eggs, cotija cheese, pico de gallo, crema, and cilantro.",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "DESSERT",
        name: "CHURROS",
        price: 8,
        is_veg: true,
        ingredients: "Served with caramel sauce..",
      },
    ],
  },
  {
    menuId: "13",
    resId: "8",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Beginning",
        name: " Spanish White Anchovies and Piquillo Pepper",
        price: 11,
        is_veg: true,
        ingredients: "",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Entrée",
        name: "Grilled Leg of Lamb, Saffron Rub, Spinach and Sofrito",
        price: 38,
        is_veg: false,
        ingredients: "",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Exotic Cocktails",
        name: "ULTIMAT MOSCOW MULE",
        price: 12,
        is_veg: false,
        ingredients: "",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Cocktails",
        name: " WITCHES SOUR",
        price: 15,
        is_veg: true,
        ingredients: "",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Beginning",
        name: "Local Corn Soup, Vanilla Oil, Chanterelle Mushroom ",
        price: 12,
        is_veg: true,
        ingredients: "",
      },
    ],
  },
  {
    menuId: "14",
    resId: "9",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "SAVORY",
        name: " FRENCH ONION 'FUN-DUE",
        price: 11,
        is_veg: true,
        ingredients:
          " House-made Caramelized Onions, Gruyére, Crostini, Ferm-Veggies",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "SAVORY",
        name: " HOUSE-MADE CROSTINI AND SPREADS ",
        price: 38,
        is_veg: false,
        ingredients: " Olive Tapenade, Herd Goat Cheese, Seasonal Spread ",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: " Chill on Tap ",
        name: "'16 Willamette Valley Pinot Noir ",
        price: 12,
        is_veg: false,
        ingredients: " Grochau Cellars",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: " Cellar on Tap",
        name: " 18 Melon de Bourgogne ",
        price: 15,
        is_veg: true,
        ingredients: "Grochau Cellars",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Sweet",
        name: "Craft Chocolate Trio ",
        price: 12,
        is_veg: true,
        ingredients: "Intrigue Chocolate Co",
      },
    ],
  },
  {
    menuId: "15",
    resId: "10",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Starters",
        name: " Fire Shrimp",
        price: 14,
        is_veg: false,
        ingredients:
          "jalapeño & habanero salsa, crema, garlic, toasted flour tortillas",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Starters",
        name: "Rockfish Ceviche",
        price: 16,
        is_veg: false,
        ingredients:
          "citrus, yuzu kosho, red onion, chile flake, pomegranate, pickled chayote",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Soup & Salad",
        name: "Butternut Squash and Beet Salad ",
        price: 15,
        is_veg: false,
        ingredients:
          "mixed greens, roasted butternut squash and beets, pepitas, fresnos, corn, queso fresco, avocado dressing",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Classic Tacos",
        name: " Spiced Steak",
        price: 6.75,
        is_veg: false,
        ingredients: "onion, cilantro, cascabel salsa, guacamole",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Classic Tacos",
        name: "baja crispy fish",
        price: 6,
        is_veg: false,
        ingredients: "cabbage, pico de gallo, chipotle aioli, cilantro",
      },
    ],
  },
  {
    menuId: "16",
    resId: "10",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Brunch",
        name: " Chilaquiles",
        price: 16,
        is_veg: false,
        ingredients:
          "jtwo sunny side up eggs*, corn tortilla chips, creamy habanero sauce, mushroom, onion, cherry tomato, corn, cotija, crema, cilantro",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Brunch",
        name: "Kids french toast ",
        price: 16,
        is_veg: true,
        ingredients: "2 pieces, seasonal fruit and breakfast potatoes",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Kids Brunch!",
        name: "kids cheesy scramble        ",
        price: 10,
        is_veg: false,
        ingredients:
          "choice of bacon or avocado, choice of breakfast potato or fruit        ",
      },
    ],
  },
  {
    menuId: "17",
    resId: "11",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "snacks & starts",
        name: " montaditos",
        price: 10,
        is_veg: false,
        ingredients:
          "toasted baguette rounds served with a sweet and savory spread toppings.fig jam, goat cheese, and prosciuttopesto, tomato, fresh basil, balsmic reduction (",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "snacks & starts",
        name: "mixed greens",
        price: 10,
        is_veg: true,
        ingredients:
          "citrus champagne vinaigrette, cherry tomato, cucumber, red onion, parmesan, almond, toasted breadcrumbs",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "mains & shares",
        name: "poco mac n’ cheese",
        price: 18,
        is_veg: true,
        ingredients:
          "penne rigate, monterey jack, havarti, medium cheddar, heavy cream  ",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "mains & shares",
        name: "charcuterie plate ",
        price: 20,
        is_veg: false,
        ingredients:
          "salami, spicy coppa, serrano ham, brie, water crackers, marcona almonds",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "mains & shares",
        name: "cheese plate",
        price: 16,
        is_veg: true,
        ingredients:
          "double creme brie, manchego, new york cheddar, smoked gouda, fig jam, honeycrisp apple, dried cranberries, candied pecans, water crackers ",
      },
    ],
  },
  {
    menuId: "18",
    resId: "12",
    menu: [
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Pub Fare",
        name: " FRESH CUT FISH & CHIPS",
        price: 17,
        is_veg: false,
        ingredients: "Beer battered rockfish, fries, remoulade sauce",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Pub Fare",
        name: "THE QUINN’S BURGER",
        price: 18,
        is_veg: false,
        ingredients:
          "*8oz house-ground angus beef, white cheddar,bacon, brioche roll, aioli, served with fries, optional addons: arugula, tomato, onion, pickle",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Large Plates",
        name: "SEARED SALMON",
        price: 22,
        is_veg: false,
        ingredients: "Seared salmon, fennel nage,pple fennel slaw, chive oil",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Large Plates",
        name: "SEAFOOD ALFREDO",
        price: 24,
        is_veg: false,
        ingredients: "Fettuccini, shrimp, scallop, parmesan",
      },
      {
        itemId: "asdasdaslkvjheoiuyed",
        category: "Small Plates",
        name: "SHEPHERD’S PIE",
        price: 13,
        is_veg: false,
        ingredients:
          "House ground beef, peas, carrots,onion, mashed potato, parmesan",
      },
    ],
  },
]);
