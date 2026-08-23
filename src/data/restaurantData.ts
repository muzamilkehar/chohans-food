import { MenuItem, DealItem, Review, PopularTimeSlot, MenuCategory } from '../types';

export const RESTAURANT_INFO = {
  name: "Chohan's Fastfood",
  formerName: "Chohan's Food Club",
  tagline: "Fried Chicken & Artisanal Pizza Destination",
  rating: 4.0,
  reviewCount: 294,
  priceRange: "Rs 150 – 3,000",
  address: "XJ3Q+4H2, Allah Wala Chowk, Shikarpur, Sindh, Pakistan",
  googlePlusCode: "XJ3Q+4H2",
  phone: "0331-7300074",
  whatsappNumber: "923317300074",
  hoursText: "Open Daily · 12:00 PM – 1:00 AM",
  services: ["Dine-in", "Drive-through", "Delivery", "Takeaway"],
  deliveryTime: "25-40 min",
  paymentMethod: "Cash on Delivery / Cash at Counter",
  deliveryAreas: [
    "Allah Wala Chowk",
    "Station Road",
    "Hathi Gate",
    "Lakhi Gate",
    "Karan Gate",
    "Stuart Ganj",
    "Cantonment Area",
    "Shikarpur City Center",
    "Civil Hospital Road"
  ]
};

export const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'pizza', name: "Pizza's", urduName: 'پیزا ورائٹی', icon: 'Pizza', description: '13 Authentic Italian & Desi flavored handcrafted pizzas' },
  { id: 'burgers', name: 'Burgers', urduName: 'برگرز', icon: 'Sandwich', description: 'Zinger, Chicken, Tikka burgers & rolls' },
  { id: 'rolls', name: 'Roll Paratha', urduName: 'رول پراٹھا', icon: 'Sandwich', description: 'Crispy flaky paratha rolls with signature sauces' },
  { id: 'broast', name: 'Crispy Chicken & Broast', urduName: 'کرسپی چکن اور بروسٹ', icon: 'Drumstick', description: 'Golden chest broast, crispy wings, hot shots & nuggets' },
  { id: 'fries', name: 'Fries & Pasta', urduName: 'فرائز اور پاستا', icon: 'Utensils', description: 'Pizza fries, mayo fries, large fries & chicken pasta' },
  { id: 'beverages', name: 'Cold Drinks', urduName: 'کولڈ ڈرنکس', icon: 'Coffee', description: 'Chilled soft drinks & tins (Pepsi, 7Up, Mirinda, Dew)' },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles', count: 32 },
  { id: 'pizza', name: "Pizza's", icon: 'Pizza', count: 13 },
  { id: 'burgers', name: 'Burgers', icon: 'Sandwich', count: 4 },
  { id: 'rolls', name: 'Roll Paratha', icon: 'Sandwich', count: 5 },
  { id: 'broast', name: 'Crispy Chicken & Broast', icon: 'Drumstick', count: 6 },
  { id: 'fries', name: 'Fries & Pasta', icon: 'Utensils', count: 5 },
  { id: 'beverages', name: 'Cold Drinks', icon: 'Coffee', count: 4 },
];

// Reusable pizza add-ons from menu card
const PIZZA_EXTRA_TOPPINGS = [
  { id: 'extra-topping-meat-cheese-small', name: 'Extra Topping Meat & Cheese (Small)', price: 100 },
  { id: 'extra-topping-meat-cheese-med', name: 'Extra Topping Meat & Cheese (Medium)', price: 150 },
  { id: 'extra-topping-meat-cheese-large', name: 'Extra Topping Meat & Cheese (Large)', price: 200 },
  { id: 'extra-garlic-sauce', name: 'Signature Garlic Mayo Dip', price: 60 }
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. PIZZAS (13 Authentic varieties from menu)
  // ==========================================
  {
    id: 'pizza-chohans-special',
    name: "1) Chohan's Special Pizza",
    urduName: "چوہان اسپیشل پیزا",
    category: 'pizza',
    price: 1100,
    originalPrice: 1200,
    description: "An Italian crust pizza, Italian sauce, spicy chicken, black olives, sweet corn, mushrooms, green pepper & specially covered with Cheese Cream.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    sizes: [
      { name: "Small", price: 550 },
      { name: "Medium", price: 1100 },
      { name: "Large", price: 1500 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-fajita',
    name: "2) Chicken Fajita Pizza",
    urduName: "چکن فجیتا پیزا",
    category: 'pizza',
    price: 1000,
    description: "A traditional taste of spicy chicken with Fajita flavor with Capsicum and Onion.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-tikka',
    name: "3) Chicken Tikka Pizza",
    urduName: "چکن تکہ پیزا",
    category: 'pizza',
    price: 1000,
    description: "A traditional taste of spicy chicken with Onion, covered with cheese.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-hot-spicy',
    name: "4) Chicken Hot Spicy Pizza",
    urduName: "چکن ہاٹ اسپائسی پیزا",
    category: 'pizza',
    price: 1000,
    description: "Specially for traditional spicy lovers, chicken onion, deep covered & cheese.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-grilled',
    name: "5) Chicken Grilled Pizza",
    urduName: "چکن گرلڈ پیزا",
    category: 'pizza',
    price: 1000,
    description: "Grilled chicken, pizza sauce, cheese, capsicum, mushroom, black olives, onions and oregano.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-mushroom',
    name: "6) Chicken Mushroom Pizza",
    urduName: "چکن مشروم پیزا",
    category: 'pizza',
    price: 1000,
    description: "Specially for mushroom lovers, chicken, mushroom, pizza sauce, cheese.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-supreme',
    name: "7) Chicken Supreme Pizza",
    urduName: "چکن سپریم پیزا",
    category: 'pizza',
    price: 1000,
    description: "A delightful mixture of spicy chunks of chicken smoked chicken, sausages, onion, bell pepper, mushrooms and olives.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-shawarma',
    name: "8) Chicken Shawarma Pizza",
    urduName: "چکن شاورما پیزا",
    category: 'pizza',
    price: 1000,
    description: "Chicken shawarma meat, spicy sauce, garlic creamy mayo, mozzarella cheese.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-bar-bq',
    name: "9) Bar B.Q Pizza",
    urduName: "بار بی کیو پیزا",
    category: 'pizza',
    price: 1000,
    description: "Lots of cheese, BBQ chicken pieces, barbecue sauce, onions & capsicum.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-achari',
    name: "10) Chicken Achari Pizza",
    urduName: "چکن اچاری پیزا",
    category: 'pizza',
    price: 1000,
    description: "Chicken with special Achari flavor, onion, green chilli, sauce and cheese.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-afghani-tikka-boti',
    name: "11) Afghani Tikka Boti Pizza",
    urduName: "افغانی تکہ بوٹی پیزا",
    category: 'pizza',
    price: 1000,
    description: "Tender mild Afghani chicken boti chunks, cheese and onion.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-chicken-malai-tikka',
    name: "12) Chicken Malai Tikka Pizza",
    urduName: "چکن ملائی تکہ پیزا",
    category: 'pizza',
    price: 1100,
    description: "An adorable taste of Tikka sauce, malai boti, bell peppers and garlic.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    sizes: [
      { name: "Small", price: 550 },
      { name: "Medium", price: 1100 },
      { name: "Large", price: 1500 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },
  {
    id: 'pizza-vegie-lover',
    name: "13) Vegie Lover Pizza",
    urduName: "ویجی لور پیزا",
    category: 'pizza',
    price: 1000,
    description: "Mushrooms, black olives, tomatoes, onions, bell pepper, specially garnished with mozzarella.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small", price: 500 },
      { name: "Medium", price: 1000 },
      { name: "Large", price: 1400 }
    ],
    addOns: PIZZA_EXTRA_TOPPINGS
  },

  // ==========================================
  // 2. BURGERS (From Burger Box)
  // ==========================================
  {
    id: 'burger-zinger',
    name: "Zinger Burger",
    urduName: "زنگر برگر",
    category: 'burgers',
    price: 300,
    originalPrice: 330,
    description: "Crispy fried whole chicken thigh fillet, spicy garlic mayo dressing, crisp iceberg lettuce in a toasted sesame bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    serves: "1 Person",
    prepTime: "8-10 mins",
    addOns: [
      { id: 'cheese-slice', name: 'Cheddar Cheese Slice', price: 60 },
      { id: 'extra-sauce', name: 'Extra Spicy Garlic Dip', price: 50 }
    ]
  },
  {
    id: 'burger-chicken',
    name: "Chicken Burger",
    urduName: "چکن برگر",
    category: 'burgers',
    price: 200,
    description: "Classic seasoned tender chicken patty with mayonnaise and shredded lettuce on soft toasted bun.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person",
    addOns: [
      { id: 'cheese-slice', name: 'Cheddar Cheese Slice', price: 60 }
    ]
  },
  {
    id: 'burger-tikka',
    name: "Tikka Burger",
    urduName: "تکہ برگر",
    category: 'burgers',
    price: 200,
    description: "Smoky spiced tikka chicken patty loaded with tangy tandoori sauce and fresh sliced onions.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    serves: "1 Person",
    addOns: [
      { id: 'cheese-slice', name: 'Cheddar Cheese Slice', price: 60 }
    ]
  },
  {
    id: 'roll-paratha-regular',
    name: "Paratha Roll",
    urduName: "پراٹھا رول",
    category: 'burgers',
    price: 150,
    description: "Fresh golden crispy paratha stuffed with flavorful spiced chicken and sauces.",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },

  // ==========================================
  // 3. ROLL PARATHA (From Roll Paratha Section)
  // ==========================================
  {
    id: 'roll-chicken-chutni',
    name: "Chicken Chutni Roll",
    urduName: "چکن چٹنی رول",
    category: 'rolls',
    price: 200,
    description: "Juicy chicken chunks wrapped in crisp golden paratha with traditional spicy mint-coriander chutni.",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    serves: "1 Person"
  },
  {
    id: 'roll-chicken-garlic',
    name: "Chicken Garlic Roll",
    urduName: "چکن گارلک رول",
    category: 'rolls',
    price: 200,
    description: "Succulent chicken cubes drizzled with rich creamy garlic sauce in a warm flaky paratha.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },
  {
    id: 'roll-chicken-mayo',
    name: "Chicken Mayo Roll",
    urduName: "چکن مایو رول",
    category: 'rolls',
    price: 200,
    description: "Tender spiced chicken with premium thick mayonnaise and crunchy onions in crisp paratha.",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    serves: "1 Person"
  },
  {
    id: 'roll-chicken-achari',
    name: "Chicken Achari Roll",
    urduName: "چکن اچاری رول",
    category: 'rolls',
    price: 200,
    description: "Zesty pickled achari spiced chicken pieces rolled in hot golden paratha.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    serves: "1 Person"
  },
  {
    id: 'roll-chicken-malai',
    name: "Chicken Malai Roll",
    urduName: "چکن ملائی رول",
    category: 'rolls',
    price: 200,
    description: "Melt-in-mouth mild malai boti chicken enveloped with creamy dressing in soft paratha.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    serves: "1 Person"
  },

  // ==========================================
  // 4. CRISPY CHICKEN & BROAST (From Crispy Chicken Box)
  // ==========================================
  {
    id: 'broast-chest-piece',
    name: "Chohan's Chicken Broast (Chest)",
    urduName: "چوہان چکن بروسٹ (چیسٹ پیس)",
    category: 'broast',
    price: 450,
    originalPrice: 480,
    description: "Chohan's legendary pressure-fried chest piece broast, crispy skin, tender juicy meat, served with garlic dip.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    serves: "1 Person",
    prepTime: "12-15 mins",
    sizes: [
      { name: "Chest Piece (Quarter)", price: 450 },
      { name: "Half Broast (2 Pcs)", price: 850 },
      { name: "Full Broast (4 Pcs)", price: 1650 }
    ],
    addOns: [
      { id: 'extra-garlic-dip', name: 'Extra Signature Garlic Mayo Dip', price: 60 },
      { id: 'dinner-bun', name: 'Fresh Soft Dinner Bun', price: 40 },
      { id: 'extra-fries', name: 'Extra Crinkle Fries', price: 100 }
    ]
  },
  {
    id: 'crispy-wings-8pcs',
    name: "Crispy Wings (8 Pcs)",
    urduName: "کرسپی ونگز (8 پیس)",
    category: 'broast',
    price: 350,
    description: "8 pieces of golden crispy coated chicken wings fried tender, juicy, and crunchy.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    serves: "1-2 Persons",
    prepTime: "10-12 mins",
    addOns: [
      { id: 'extra-garlic-dip', name: 'Extra Garlic Dip', price: 60 }
    ]
  },
  {
    id: 'hot-shots-10pcs',
    name: "Hot Shots (10 Pcs)",
    urduName: "ہاٹ شاٹس (10 پیس)",
    category: 'broast',
    price: 350,
    description: "10 pieces of bite-sized spicy crunchy chicken hot shots with dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    isSpicy: true,
    serves: "1 Person"
  },
  {
    id: 'crispy-nuggets',
    name: "Chicken Nuggets (5 Pcs / 10 Pcs)",
    urduName: "کرسپی چکن نگٹس",
    category: 'broast',
    price: 200,
    description: "Tender seasoned minced chicken bites with ultra-crisp golden breading, served with sweet tomato dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "5 Pcs", price: 200 },
      { name: "10 Pcs", price: 350 }
    ]
  },
  {
    id: 'crispy-roll',
    name: "Crispy Roll",
    urduName: "کرسپی رول",
    category: 'broast',
    price: 200,
    description: "Crunchy crispy fried chicken strips wrapped with lettuce and spicy mayo in roll.",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },

  // ==========================================
  // 5. FRIES & PASTA (From Fries Box)
  // ==========================================
  {
    id: 'fries-pizza',
    name: "Pizza Fries",
    urduName: "پیزا فرائز",
    category: 'fries',
    price: 250,
    originalPrice: 280,
    description: "Crispy fries baked under a blanket of pizza sauce, seasoned chicken chunks, shredded mozzarella cheese, black olives and oregano.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    serves: "1-2 Persons"
  },
  {
    id: 'fries-mayo',
    name: "Mayo Fries",
    urduName: "مایو فرائز",
    category: 'fries',
    price: 200,
    description: "Golden crispy fries generously smothered in creamy garlic mayonnaise dressing.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },
  {
    id: 'fries-large',
    name: "Large Fries",
    urduName: "لارج فرائز",
    category: 'fries',
    price: 150,
    description: "Generous bucket of hot, golden salted French fries with tomato dip.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    serves: "1-2 Persons"
  },
  {
    id: 'pasta-chicken',
    name: "Chicken Pasta (Small / Large)",
    urduName: "چکن پاستا",
    category: 'fries',
    price: 200,
    description: "Rich creamy macaroni pasta cooked with seasoned chicken, spicy sauce, and cheese topping.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    sizes: [
      { name: "Small", price: 200 },
      { name: "Large", price: 350 }
    ]
  },
  {
    id: 'fries-regular',
    name: "Regular Fries",
    urduName: "ریگولر فرائز",
    category: 'fries',
    price: 100,
    description: "Hot golden crinkle-cut salted French fries.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },

  // ==========================================
  // 6. COLD DRINKS (From Cold Drinks Section)
  // ==========================================
  {
    id: 'drink-1-5l',
    name: "Cold Drink 1.5 Liter",
    urduName: "کولڈ ڈرنک 1.5 لیٹر",
    category: 'beverages',
    price: 200,
    description: "Ice-cold 1.5 Liter family bottle (Pepsi, 7Up, Mirinda, Mountain Dew, Sting).",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    serves: "3-4 Persons"
  },
  {
    id: 'drink-1l',
    name: "Cold Drink 1 Liter",
    urduName: "کولڈ ڈرنک 1 لیٹر",
    category: 'beverages',
    price: 140,
    description: "Chilled 1 Liter soft drink bottle (Pepsi, 7Up, Mirinda, Dew).",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    serves: "2-3 Persons"
  },
  {
    id: 'drink-tin',
    name: "Cold Drink Tin (300ml)",
    urduName: "کولڈ ڈرنک ٹن",
    category: 'beverages',
    price: 100,
    description: "Chilled 300ml cold drink can (Pepsi, 7Up, Mirinda, Mountain Dew).",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },
  {
    id: 'drink-500ml',
    name: "Cold Drink 500ml",
    urduName: "کولڈ ڈرنک 500 ملی لیٹر",
    category: 'beverages',
    price: 80,
    description: "Chilled 500ml individual soft drink bottle.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  }
];

// ==========================================
// ALL 27 DEALS FROM OFFICIAL MENU CARD
// ==========================================
export const DEALS_DATA: DealItem[] = [
  // --- VALUE DEALS (Deals 1 to 12) ---
  {
    id: 'deal-1',
    title: "Deal 1: Chicken Burger Combo",
    urduTitle: "ڈیل 1: چکن برگر کومبو",
    tag: "Value Deal",
    price: 350,
    originalPrice: 400,
    items: [
      "1 Chicken Burger",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 350"
  },
  {
    id: 'deal-2',
    title: "Deal 2: Zinger Burger Combo",
    urduTitle: "ڈیل 2: زنگر برگر کومبو",
    tag: "Top Seller",
    price: 350,
    originalPrice: 400,
    items: [
      "1 Zinger Burger",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 350"
  },
  {
    id: 'deal-3',
    title: "Deal 3: Tikka Burger Combo",
    urduTitle: "ڈیل 3: تکہ برگر کومبو",
    tag: "Value Deal",
    price: 350,
    originalPrice: 400,
    items: [
      "1 Tikka Burger",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 350"
  },
  {
    id: 'deal-4',
    title: "Deal 4: 2 Zinger Burgers Deal",
    urduTitle: "ڈیل 4: 2 زنگر برگرز",
    tag: "Duo Deal",
    price: 650,
    originalPrice: 700,
    items: [
      "2 Zinger Burger",
      "1 Reg. Fries"
    ],
    serves: "2 Persons",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 650"
  },
  {
    id: 'deal-5',
    title: "Deal 5: 6 Crispy Wings Deal",
    urduTitle: "ڈیل 5: 6 کرسپی ونگز",
    tag: "Crispy Deal",
    price: 450,
    originalPrice: 500,
    items: [
      "6 Crispy Wings",
      "1 Reg. Fries"
    ],
    serves: "1-2 Persons",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 450"
  },
  {
    id: 'deal-6',
    title: "Deal 6: Zinger & Nuggets Combo",
    urduTitle: "ڈیل 6: زنگر اور نگٹس",
    tag: "Value Deal",
    price: 650,
    originalPrice: 720,
    items: [
      "1 Zinger Burger",
      "3 Nuggets",
      "1 Reg. Fries"
    ],
    serves: "1-2 Persons",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 650"
  },
  {
    id: 'deal-7',
    title: "Deal 7: Grilled Paratha Combo",
    urduTitle: "ڈیل 7: گرلڈ پراٹھا کومبو",
    tag: "Budget Deal",
    price: 250,
    originalPrice: 300,
    items: [
      "1 Grilled Paratha",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 250"
  },
  {
    id: 'deal-8',
    title: "Deal 8: Shawarma Box",
    urduTitle: "ڈیل 8: شاورما باکس",
    tag: "Budget Deal",
    price: 250,
    originalPrice: 300,
    items: [
      "1 Shawarma",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 250"
  },
  {
    id: 'deal-9',
    title: "Deal 9: Hot Shots Feast",
    urduTitle: "ڈیل 9: ہاٹ شاٹس فیسٹ",
    tag: "Spicy Deal",
    price: 550,
    originalPrice: 600,
    items: [
      "1 Hot Shot (10 Pcs)",
      "1 Reg. Fries"
    ],
    serves: "1-2 Persons",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 550"
  },
  {
    id: 'deal-10',
    title: "Deal 10: Small Pizza & Zinger Delight",
    urduTitle: "ڈیل 10: پیزا اور زنگر ڈیلائٹ",
    tag: "Combo Hit",
    price: 850,
    originalPrice: 950,
    items: [
      "1 Small Pizza",
      "1 Zinger Burger",
      "1 Reg. Fries"
    ],
    serves: "2 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 850"
  },
  {
    id: 'deal-11',
    title: "Deal 11: 4 Zingers Family Party Box",
    urduTitle: "ڈیل 11: 4 زنگرز فیملی باکس",
    tag: "Family Deal",
    price: 1450,
    originalPrice: 1650,
    items: [
      "4 Zinger Burger",
      "2 Reg. Fries",
      "1 Drink 1.5 Liter"
    ],
    serves: "4 Persons",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 200"
  },
  {
    id: 'deal-12',
    title: "Deal 12: Chest Broast Combo",
    urduTitle: "ڈیل 12: چیسٹ بروسٹ کومبو",
    tag: "Broast Deal",
    price: 450,
    originalPrice: 500,
    items: [
      "1 Broast (Chest)",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 450"
  },

  // --- PIZZA DEALS (Pizza Deals 1 to 4) ---
  {
    id: 'pizza-deal-1',
    title: "Pizza Deal 1: Small Pizza & Drink",
    urduTitle: "پیزا ڈیل 1: سمال پیزا اور ڈرنک",
    tag: "Pizza Deal",
    price: 550,
    originalPrice: 600,
    items: [
      "1 Small Pizza",
      "1 Drink 500ml"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 550"
  },
  {
    id: 'pizza-deal-2',
    title: "Pizza Deal 2: 2 Medium Pizzas Feast",
    urduTitle: "پیزا ڈیل 2: 2 میڈیم پیزاز فیسٹ",
    tag: "Pizza Feast",
    price: 2100,
    originalPrice: 2300,
    items: [
      "2 Medium Pizza",
      "1 Drink 1.5 Liter"
    ],
    serves: "3-4 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 200"
  },
  {
    id: 'pizza-deal-3',
    title: "Pizza Deal 3: 1 Large Pizza Combo",
    urduTitle: "پیزا ڈیل 3: لارج پیزا کومبو",
    tag: "Large Pizza",
    price: 1500,
    originalPrice: 1650,
    items: [
      "1 Large Pizza",
      "1 Drink 1.5 Liter"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1500"
  },
  {
    id: 'pizza-deal-4',
    title: "Pizza Deal 4: 2 Large Pizzas Mega Feast",
    urduTitle: "پیزا ڈیل 4: 2 لارج پیزاز میگا فیسٹ",
    tag: "Mega Feast",
    price: 3000,
    originalPrice: 3400,
    items: [
      "2 Large Pizza",
      "2 Drink 1.5 Liter"
    ],
    serves: "5-6 Persons",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 400"
  },

  // --- SUPER DEALS (Super Deals 1 to 10) ---
  {
    id: 'super-deal-1',
    title: "Super Deal 1: Medium Pizza, Wings & Drink",
    urduTitle: "سپر ڈیل 1: میڈیم پیزا، ونگز اور ڈرنک",
    tag: "Super Deal",
    price: 1300,
    originalPrice: 1450,
    items: [
      "1 Medium Pizza",
      "4 Wings",
      "1 Drink 1 Liter"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1300"
  },
  {
    id: 'super-deal-2',
    title: "Super Deal 2: Large Pizza, Wings & Drink",
    urduTitle: "سپر ڈیل 2: لارج پیزا، ونگز اور ڈرنک",
    tag: "Super Deal",
    price: 1700,
    originalPrice: 1900,
    items: [
      "1 Large Pizza",
      "4 Wings",
      "1 Drink 1.5 Liter"
    ],
    serves: "3-4 Persons",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1700"
  },
  {
    id: 'super-deal-3',
    title: "Super Deal 3: Pizza, Wings, Pasta & Drink",
    urduTitle: "سپر ڈیل 3: پیزا، ونگز، پاستا اور ڈرنک",
    tag: "Super Deal",
    price: 1300,
    originalPrice: 1450,
    items: [
      "1 Small Pizza",
      "4 Wings",
      "1 Chicken Pasta Small",
      "1 Drink 1 Liter"
    ],
    serves: "2 Persons",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1300"
  },
  {
    id: 'super-deal-4',
    title: "Super Deal 4: Med Pizza, Wings, Large Pasta & Drink",
    urduTitle: "سپر ڈیل 4: میڈیم پیزا، ونگز اور لارج پاستا",
    tag: "Super Deal",
    price: 1900,
    originalPrice: 2150,
    items: [
      "1 Medium Pizza",
      "4 Wings",
      "1 Chicken Pasta Large",
      "1 Drink 1 Liter"
    ],
    serves: "3-4 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1900"
  },
  {
    id: 'super-deal-5',
    title: "Super Deal 5: Large Pizza, Wings, Large Pasta & Drink",
    urduTitle: "سپر ڈیل 5: لارج پیزا، ونگز اور لارج پاستا",
    tag: "Super Deal",
    price: 2200,
    originalPrice: 2500,
    items: [
      "1 Large Pizza",
      "4 Wings",
      "1 Chicken Pasta Large",
      "1 Drink 1 Liter"
    ],
    serves: "4-5 Persons",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 300"
  },
  {
    id: 'super-deal-6',
    title: "Super Deal 6: 2 Zingers, Fries & Mayo Roll",
    urduTitle: "سپر ڈیل 6: 2 زنگرز، فرائز اور مایو رول",
    tag: "Super Deal",
    price: 920,
    originalPrice: 1000,
    items: [
      "2 Zinger Burger",
      "1 Reg. Fries",
      "1 Mayo Roll"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 920"
  },
  {
    id: 'super-deal-7',
    title: "Super Deal 7: Pasta, 5 Large Nuggets, Fries & Drink",
    urduTitle: "سپر ڈیل 7: پاستا، 5 نگٹس اور ڈرنک",
    tag: "Super Deal",
    price: 1100,
    originalPrice: 1250,
    items: [
      "1 Chicken Pasta",
      "5 Nuggets Large",
      "1 Reg. Fries",
      "1 Drink 1 Liter"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1100"
  },
  {
    id: 'super-deal-8',
    title: "Super Deal 8: Small Pasta & Fries",
    urduTitle: "سپر ڈیل 8: سمال پاستا اور فرائز",
    tag: "Super Deal",
    price: 600,
    originalPrice: 650,
    items: [
      "1 Chicken Pasta Small",
      "1 Reg. Fries"
    ],
    serves: "1 Person",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 600"
  },
  {
    id: 'super-deal-9',
    title: "Super Deal 9: Chest Broast, 4 Wings & Tin Drink",
    urduTitle: "سپر ڈیل 9: چیسٹ بروسٹ، 4 ونگز اور ٹن",
    tag: "Broast Special",
    price: 700,
    originalPrice: 780,
    items: [
      "1 Chest Broast",
      "4 Wings",
      "1 Tin 300 ml"
    ],
    serves: "1-2 Persons",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 700"
  },
  {
    id: 'super-deal-10',
    title: "Super Deal 10: Large Pasta, 2 Shawarma & Drink",
    urduTitle: "سپر ڈیل 10: لارج پاستا، 2 شاورما اور ڈرنک",
    tag: "Super Deal",
    price: 1050,
    originalPrice: 1200,
    items: [
      "1 Pasta Large",
      "2 Shawarma",
      "1 Reg. Fries",
      "1 Drink 1 Liter"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    badge: "Rs 1050"
  },

  // --- HAPPY MEAL ---
  {
    id: 'happy-meal',
    title: "Happy Meal: 2 Small Pizzas, 4 Wings & 1L Drink",
    urduTitle: "ہیپی میل: 2 سمال پیزاز، 4 ونگز اور ڈرنک",
    tag: "Happy Meal",
    price: 1300,
    originalPrice: 1500,
    items: [
      "2 Small Pizza",
      "4 Wings",
      "1 Drink 1 Liter"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 200"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: "Agha Zuhaib Ali",
    role: "Local Guide · 221 reviews · 2,236 photos",
    rating: 4,
    date: "Google Maps Review",
    comment: "Chohan's Food Club is a Fast Food restaurant in Shikarpur. They have changed the name it's an old restaurant. They are famous for 🍕 Pizza. They only deal in Cash, no cards accepted. Staff is professional. If you are in town then must visit.",
    tags: ["Famous Pizza", "Professional Staff", "Cash Only", "Must Visit"],
    photosCount: 6,
    avatarBg: "bg-emerald-600"
  },
  {
    id: 'rev-2',
    author: "Asim",
    role: "Local Guide · 119 reviews · 149 photos",
    rating: 4,
    date: "Google Maps Review",
    comment: "I have tried their Pizza and broast, pizza was good in fact better than 'AR fastfood' and broast was fried well. Overall service is fast. Place is somewhat smaller than competitors but food quality stands out.",
    tags: ["Better than Competitors", "Well Fried Broast", "Fast Service", "Quality Food"],
    photosCount: 3,
    avatarBg: "bg-amber-600"
  },
  {
    id: 'rev-3',
    author: "Muzafar Ali Solangi",
    role: "Verified Local Customer · 4 reviews",
    rating: 4,
    date: "Google Maps Review",
    comment: "Very good Service and food quality! Crispy broast is freshly prepared. Space gets busy especially on special events like Eid so ordering takeaway or delivery is super convenient.",
    tags: ["Good Service", "Fresh Food", "Takeaway Recommended"],
    avatarBg: "bg-indigo-600"
  },
  {
    id: 'rev-4',
    author: "Tariq Mehmood",
    role: "Local Guide · Shikarpur",
    rating: 5,
    date: "Google Maps Review",
    comment: "Undoubtedly the best fastfood taste in Allah Wala Chowk area! The Chicken Broast skin is extra crispy and the Zinger burger sauce has the right spicy kick. Highly recommended for family night takeaways.",
    tags: ["Best in Shikarpur", "Extra Crispy Broast", "Zinger Fan"],
    avatarBg: "bg-rose-600"
  },
  {
    id: 'rev-5',
    author: "Farhan Ahmed",
    role: "Verified Customer",
    rating: 5,
    date: "Google Maps Review",
    comment: "Their Malai Tikka Pizza with extra cheese and loaded Pizza fries are top notch. Quick delivery to Station road within 30 minutes, piping hot food!",
    tags: ["Pizza Fries", "Hot & Fast Delivery", "Malai Tikka"],
    avatarBg: "bg-blue-600"
  }
];

export const POPULAR_TIMES_DATA: Record<string, PopularTimeSlot[]> = {
  Saturday: [
    { hour: "12 PM", busyness: 25, label: "Opening rush" },
    { hour: "2 PM", busyness: 45, label: "Lunch rush" },
    { hour: "4 PM", busyness: 30, label: "Moderate" },
    { hour: "6 PM", busyness: 60, label: "Evening tea & snacks" },
    { hour: "8 PM", busyness: 95, label: "Peak Dinner hour (Usually Busy)" },
    { hour: "10 PM", busyness: 100, label: "Peak rush hour" },
    { hour: "11 PM", busyness: 85, label: "Late dinner orders" },
    { hour: "12 AM", busyness: 50, label: "Late night cravings" },
    { hour: "1 AM", busyness: 15, label: "Closing" },
  ],
  Sunday: [
    { hour: "12 PM", busyness: 30, label: "Lunch crowd" },
    { hour: "2 PM", busyness: 55, label: "Family lunch" },
    { hour: "4 PM", busyness: 35, label: "Moderate" },
    { hour: "6 PM", busyness: 70, label: "High crowd" },
    { hour: "8 PM", busyness: 100, label: "Maximum Peak" },
    { hour: "10 PM", busyness: 95, label: "Busy" },
    { hour: "11 PM", busyness: 75, label: "Late orders" },
    { hour: "12 AM", busyness: 45, label: "Night owl snacks" },
    { hour: "1 AM", busyness: 10, label: "Closing" },
  ],
  Weekdays: [
    { hour: "12 PM", busyness: 20, label: "Quiet" },
    { hour: "2 PM", busyness: 40, label: "Lunch specials" },
    { hour: "4 PM", busyness: 25, label: "Quiet" },
    { hour: "6 PM", busyness: 50, label: "After work" },
    { hour: "8 PM", busyness: 80, label: "Dinner rush" },
    { hour: "10 PM", busyness: 85, label: "Peak" },
    { hour: "11 PM", busyness: 65, label: "Late night" },
    { hour: "12 AM", busyness: 35, label: "Wrap up" },
    { hour: "1 AM", busyness: 10, label: "Closing" },
  ]
};

export const RESTAURANT_FAQS = [
  {
    question: "Where is Chohan's Fastfood located?",
    answer: "We are located at Allah Wala Chowk, Shikarpur, Sindh, Pakistan (Google Plus Code: XJ3Q+4H2). Easy access with parking space for drive-through and bike takeaway."
  },
  {
    question: "What are your opening hours?",
    answer: "We are open 7 days a week from 12:00 PM (Noon) until 1:00 AM midnight. Midnight food delivery is available across Shikarpur."
  },
  {
    question: "What payment methods are accepted?",
    answer: "As noted by our regular patrons, we operate on Cash on Delivery (COD) for home orders and Cash at counter for Dine-in / Takeaway."
  },
  {
    question: "How can I place an online order for delivery?",
    answer: "You can select your favorite broast, pizza, or deals right here on our website, customize with sauces/cheese, and click 'Order via WhatsApp' to instantly message our kitchen staff at 0331-7300074 with your exact order and address."
  },
  {
    question: "What are Chohan's most famous signature dishes?",
    answer: "Our Golden Crispy Chicken Broast with signature garlic sauce, Chohan's Special Pizza, Chicken Fajita, Chicken Tikka Pizza, and Pizza Fries are the city's top favorites!"
  }
];
