import { MenuItem, DealItem, Review, PopularTimeSlot } from '../types';

export const RESTAURANT_INFO = {
  name: "Chohan's Fastfood",
  formerName: "Chohan's Food Club",
  tagline: "Shikarpur's Iconic Broast & Artisanal Pizza Destination",
  rating: 4.0,
  reviewCount: 294,
  priceRange: "Rs 1,000 – 2,000",
  address: "XJ3Q+4H2, Allah Wala Chowk, Shikarpur, Sindh, Pakistan",
  googlePlusCode: "XJ3Q+4H2",
  phone: "+92 331 7300074",
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

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles', count: 28 },
  { id: 'deals', name: 'Super Deals & Combos', icon: 'Flame', count: 4 },
  { id: 'broast', name: 'Signature Broast', icon: 'Drumstick', count: 5 },
  { id: 'pizza', name: 'Handcrafted Pizza', icon: 'Pizza', count: 6 },
  { id: 'burgers', name: 'Burgers & Sandwiches', icon: 'Sandwich', count: 6 },
  { id: 'fries', name: 'Loaded Fries & Sides', icon: 'Utensils', count: 4 },
  { id: 'beverages', name: 'Drinks & Shakes', icon: 'Coffee', count: 5 },
];

export const MENU_ITEMS: MenuItem[] = [
  // Signature Broast
  {
    id: 'broast-quarter',
    name: "Chohan's Golden Chicken Broast (Quarter)",
    urduName: "چوہان گولڈن چکن بروسٹ (کوارٹر)",
    category: 'broast',
    price: 480,
    originalPrice: 520,
    description: "Our legendary pressure-fried quarter chicken marinated in secret Shikarpuri herbs, extra crispy golden skin, tender juicy meat, served with spicy garlic sauce and seasoned crinkle fries.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    serves: "1 Person",
    prepTime: "12-15 mins",
    sizes: [
      { name: "Quarter (1 Pc)", price: 480 },
      { name: "Half (2 Pcs)", price: 920 },
      { name: "Full (4 Pcs)", price: 1780 }
    ],
    addOns: [
      { id: 'extra-garlic-dip', name: 'Extra Signature Garlic Mayo Dip', price: 60 },
      { id: 'extra-spicy-sauce', name: 'Extra Peri-Chili Hot Sauce', price: 60 },
      { id: 'dinner-bun', name: 'Fresh Soft Dinner Bun (2 pcs)', price: 80 },
      { id: 'coleslaw', name: 'Creamy Crunchy Coleslaw', price: 90 },
      { id: 'extra-fries', name: 'Extra Seasoned Crinkle Fries', price: 150 }
    ]
  },
  {
    id: 'broast-spicy-wings',
    name: "Fiery Crispy Broasted Wings (6 Pcs)",
    urduName: "کرسپی بروسٹڈ ونگز",
    category: 'broast',
    price: 520,
    description: "6 large crispy coated chicken wings fried to perfection, tossed in mild tangy paprika blend, served with garlic dip.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSpicy: true,
    serves: "1-2 Persons",
    prepTime: "10-12 mins",
    addOns: [
      { id: 'extra-garlic-dip', name: 'Extra Signature Garlic Dip', price: 60 },
      { id: 'cheese-dip', name: 'Melted Cheddar Cheese Dip', price: 100 }
    ]
  },
  {
    id: 'broast-family-platter',
    name: "Chohan's Grand Broast Platter (8 Pcs)",
    urduName: "چوہان گرینڈ بروسٹ پلیٹر",
    category: 'broast',
    price: 3200,
    originalPrice: 3500,
    description: "8 pieces of signature golden crispy broasted chicken, jumbo bucket of fries, 4 soft dinner buns, 4 garlic dips, coleslaw & 1.5L soft drink.",
    image: "https://images.unsplash.com/photo-1527477321055-43615b6294a5?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    serves: "4-5 Persons",
    prepTime: "20-25 mins",
    addOns: [
      { id: 'extra-large-fries', name: 'Upgrade to Loaded Cheese Fries', price: 250 },
      { id: 'extra-dip-pack', name: 'Pack of 3 Special Sauces', price: 150 }
    ]
  },

  // Pizzas
  {
    id: 'pizza-tikka-special',
    name: "Shikarpur Special Chicken Tikka Pizza",
    urduName: "شکارپور اسپیشل چکن تکہ پیزا",
    category: 'pizza',
    price: 950,
    originalPrice: 1050,
    description: "Chohan's most ordered pizza! Generously loaded with smoky tandoori chicken chunks, rich marinara, 100% pure stretchy mozzarella, sweet bell peppers, and diced red onions.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    sizes: [
      { name: "Small (7 Inch - 4 Slices)", price: 550 },
      { name: "Medium (10 Inch - 6 Slices)", price: 950 },
      { name: "Large (13 Inch - 8 Slices)", price: 1450 },
      { name: "Jumbo XL (16 Inch - 10 Slices)", price: 1950 }
    ],
    addOns: [
      { id: 'extra-cheese', name: 'Double Mozzarella Cheese Crust', price: 200 },
      { id: 'cheese-stuffed-crust', name: 'Cheesy Stuffed Crust Border', price: 250 },
      { id: 'jalapenos-olives', name: 'Black Olives & Spicy Jalapenos', price: 90 },
      { id: 'ranch-drizzle', name: 'Creamy Garlic Ranch Drizzle', price: 70 }
    ]
  },
  {
    id: 'pizza-fajita-sicilian',
    name: "Chicken Fajita Sicilian Pizza",
    urduName: "چکن فجیتا سسلین پیزا",
    category: 'pizza',
    price: 980,
    description: "Tender spiced fajita chicken breast, sautéed green capsicum, Spanish black olives, pickled jalapenos, melted mozzarella and mild chili flakes.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    sizes: [
      { name: "Small (7 Inch)", price: 580 },
      { name: "Medium (10 Inch)", price: 980 },
      { name: "Large (13 Inch)", price: 1480 },
      { name: "Jumbo XL (16 Inch)", price: 1980 }
    ],
    addOns: [
      { id: 'extra-cheese', name: 'Extra Mozzarella Topping', price: 200 },
      { id: 'stuffed-crust', name: 'Stuffed Cheesy Crust', price: 250 }
    ]
  },
  {
    id: 'pizza-creamy-supreme',
    name: "Creamy Malai Tikka Supreme Pizza",
    urduName: "کیمیائی ملائی تکہ پیزا",
    category: 'pizza',
    price: 1050,
    description: "Velvety white garlic herb sauce base, succulent malai boti chicken chunks, sweet corn, mushrooms, melted cheddar-mozzarella blend and oregano dust.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isNew: true,
    sizes: [
      { name: "Small (7 Inch)", price: 620 },
      { name: "Medium (10 Inch)", price: 1050 },
      { name: "Large (13 Inch)", price: 1550 },
      { name: "Jumbo XL (16 Inch)", price: 2100 }
    ],
    addOns: [
      { id: 'extra-cheese', name: 'Extra Melted Cheese', price: 200 },
      { id: 'mushrooms', name: 'Extra Sliced Mushrooms', price: 100 }
    ]
  },
  {
    id: 'pizza-cheese-lover',
    name: "Four Cheese Margherita & Herb",
    urduName: "فور چیز پیزا",
    category: 'pizza',
    price: 850,
    description: "Rich Italian tomato sauce loaded with double mozzarella, mild cheddar, parmesan dust and aromatic dry basil on a crisp golden crust.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Small (7 Inch)", price: 480 },
      { name: "Medium (10 Inch)", price: 850 },
      { name: "Large (13 Inch)", price: 1300 }
    ]
  },

  // Burgers & Sandwiches
  {
    id: 'burger-crispy-zinger',
    name: "Chohan's Signature Zinger Burger",
    urduName: "چوہان اسپیشل زنگر برگر",
    category: 'burgers',
    price: 450,
    originalPrice: 490,
    description: "Super crispy thick-cut whole chicken thigh fillet, fried to crunchy perfection, shredded crisp iceberg lettuce, signature chili garlic mayo on a toasted sesame brioche bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    serves: "1 Person",
    prepTime: "8-10 mins",
    addOns: [
      { id: 'cheese-slice', name: 'Cheddar Cheese Slice', price: 60 },
      { id: 'double-patty', name: 'Extra Fried Zinger Fillet', price: 220 },
      { id: 'jalapeno', name: 'Spicy Jalapenos & Sauce', price: 50 },
      { id: 'fries-drink-combo', name: 'Make it a Meal (Fries + Drink)', price: 180 }
    ]
  },
  {
    id: 'burger-mighty-double',
    name: "Mighty Double Crunch Zinger Burger",
    urduName: "مائٹی ڈبل کرینچ زنگر",
    category: 'burgers',
    price: 680,
    originalPrice: 740,
    description: "Two crispy fried zinger fillets, double melted American cheese slices, spicy thousand island dressing, crisp lettuce on toasted jumbo bun.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    addOns: [
      { id: 'fries-drink-combo', name: 'Add Fries & Chilled Drink', price: 180 }
    ]
  },
  {
    id: 'sandwich-grilled-club',
    name: "Triple Layer Chicken Club Sandwich",
    urduName: "اسپیشل ٹرپل کلب سینڈوچ",
    category: 'burgers',
    price: 420,
    description: "Three toasted bread slices layered with shredded spiced chicken, fried egg, cucumber, tomato, melted cheese and garlic mayonnaise with side fries.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    addOns: [
      { id: 'cheese-slice', name: 'Extra Cheese Slice', price: 60 },
      { id: 'fries-portion', name: 'Extra French Fries', price: 120 }
    ]
  },
  {
    id: 'wrap-chicken-shawarma',
    name: "Chohan's Special Shawarma Roll",
    urduName: "چکن شاورما رول",
    category: 'burgers',
    price: 240,
    description: "Juicy marinated shredded chicken rolled in soft pita with crunchy pickled vegetables, signature tahini garlic mayo and secret spices.",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    addOns: [
      { id: 'extra-cheese', name: 'Add Melted Cheese', price: 60 },
      { id: 'extra-chicken', name: 'Double Chicken Filling', price: 100 }
    ]
  },

  // Fries & Sides
  {
    id: 'fries-loaded-pizza',
    name: "Chohan's Famous Pizza Fries",
    urduName: "چوہان فیمس پیزا فرائز",
    category: 'fries',
    price: 520,
    originalPrice: 580,
    description: "Crispy crinkle fries baked under a blanket of pizza sauce, seasoned chicken chunks, shredded mozzarella cheese, black olives, jalapenos and oregano herbs.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSpicy: true,
    serves: "1-2 Persons",
    addOns: [
      { id: 'extra-cheese', name: 'Extra Double Cheese Layer', price: 120 },
      { id: 'extra-sauce', name: 'Chili Garlic Dip', price: 50 }
    ]
  },
  {
    id: 'fries-masala-crinkle',
    name: "Spicy Masala Crinkle Cut Fries",
    urduName: "اسپائسی مسالہ کرینکل فرائز",
    category: 'fries',
    price: 220,
    description: "Hot, golden, extra-crisp crinkle cut potatoes dusted in Chohan's zesty chaat masala spice mix with tangy tomato dip.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Regular Box", price: 220 },
      { name: "Large Box", price: 340 }
    ]
  },
  {
    id: 'sides-crispy-nuggets',
    name: "Golden Chicken Nuggets (8 Pcs)",
    urduName: "کرسپی چکن نگٹس",
    category: 'fries',
    price: 360,
    description: "Tender seasoned minced chicken bites with ultra-crisp golden breading, served with sweet tomato dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    serves: "1 Person"
  },

  // Beverages & Shakes
  {
    id: 'drink-chilled-soda',
    name: "Chilled Soft Drinks (500ml / 1.5L)",
    urduName: "ٹھنڈی بوتل",
    category: 'beverages',
    price: 90,
    description: "Ice-cold refreshing beverage of your choice (Pepsi, 7Up, Mirinda, Mountain Dew, Sting).",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Can (250ml)", price: 90 },
      { name: "Regular Bottle (500ml)", price: 120 },
      { name: "Family Jumbo (1.5L)", price: 240 }
    ]
  },
  {
    id: 'shake-oreo-thick',
    name: "Loaded Chocolate Oreo Thickshake",
    urduName: "اورائیو چاکلیٹ شیک",
    category: 'beverages',
    price: 320,
    description: "Creamy whole milk blended with rich vanilla ice cream, crushed Oreo cookies, chocolate ganache drizzle and whipped cream.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    isPopular: true
  },
  {
    id: 'shake-mango-blast',
    name: "Sindhi Mango / Strawberry Chilled Shake",
    urduName: "مینگو / اسٹرابیری شیک",
    category: 'beverages',
    price: 290,
    description: "Freshly blended luscious fruit milkshake served ice cold.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'mineral-water',
    name: "Nestle Pure Mineral Water",
    urduName: "منرل واٹر",
    category: 'beverages',
    price: 60,
    sizes: [
      { name: "Small (500ml)", price: 60 },
      { name: "Large (1.5L)", price: 110 }
    ],
    description: "Clean, chilled sealed mineral water.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80"
  }
];

export const DEALS_DATA: DealItem[] = [
  {
    id: 'deal-1-broast-duo',
    title: "Deal 1: Broast Lover's Combo",
    urduTitle: "ڈیل 1: بروسٹ لورز کومبو",
    tag: "Most Popular",
    price: 1150,
    originalPrice: 1350,
    items: [
      "2 Pcs Golden Crispy Chicken Broast",
      "1 Large Masala Crinkle Fries",
      "2 Soft Dinner Buns & Garlic Dips",
      "2 Chilled 345ml Soft Drinks"
    ],
    serves: "1-2 Persons",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 200"
  },
  {
    id: 'deal-2-pizza-feast',
    title: "Deal 2: Shikarpur Pizza & Broast Feast",
    urduTitle: "ڈیل 2: پیزا اینڈ بروسٹ فیسٹ",
    tag: "Family Favorite",
    price: 1750,
    originalPrice: 2050,
    items: [
      "1 Medium Shikarpur Tikka Pizza (10 Inch)",
      "2 Pcs Golden Broasted Chicken",
      "1 Portion Hot Crinkle Fries",
      "1 Litre Chilled Soft Drink"
    ],
    serves: "2-3 Persons",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 300"
  },
  {
    id: 'deal-3-zinger-duo',
    title: "Deal 3: Double Zinger Crunch Box",
    urduTitle: "ڈیل 3: ڈبل زنگر باکس",
    tag: "Budget Value",
    price: 1100,
    originalPrice: 1280,
    items: [
      "2 Signature Crispy Zinger Burgers",
      "1 Box Regular French Fries",
      "2 Chilled Cold Drinks (250ml)"
    ],
    serves: "2 Persons",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 180"
  },
  {
    id: 'deal-4-family-mega',
    title: "Deal 4: Chohan's Mega Party Platter",
    urduTitle: "ڈیل 4: چوہان میگا فیملی پلانر",
    tag: "Grand Value",
    price: 3450,
    originalPrice: 3950,
    items: [
      "1 Large Special Tikka/Fajita Pizza (13 Inch)",
      "4 Pcs Golden Crispy Broast",
      "1 Loaded Pizza Fries Dish",
      "1.5L Chilled Family Drink"
    ],
    serves: "4-6 Persons",
    image: "https://images.unsplash.com/photo-1527477321055-43615b6294a5?auto=format&fit=crop&w=800&q=80",
    badge: "Save Rs 500"
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
    answer: "You can select your favorite broast, pizza, or deals right here on our website, customize with sauces/cheese, and click 'Order via WhatsApp' to instantly message our kitchen staff at +92 331 7300074 with your exact order and address."
  },
  {
    question: "What are Chohan's most famous signature dishes?",
    answer: "Our Golden Crispy Pressure-Fried Chicken Broast with signature garlic sauce, and our freshly baked Shikarpur Special Chicken Tikka Pizza and Pizza Fries are the city's top favorites!"
  }
];
