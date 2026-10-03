require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./model/product");

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with deep bass and comfortable ear cushions.",
    price: 2499,
    category: "Electronics",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
    rating: 4.5,
    numberOfReviews: 120
  },
  {
    name: "Smart Watch Pro",
    description: "Smart fitness watch with activity tracking and notification support.",
    price: 3999,
    category: "Electronics",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    rating: 4.4,
    numberOfReviews: 95
  },
  {
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with clear sound and long battery life.",
    price: 1799,
    category: "Electronics",
    stock: 75,
    imageUrl: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"],
    rating: 4.3,
    numberOfReviews: 88
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard designed for gaming and productivity.",
    price: 3299,
    category: "Electronics",
    stock: 25,
    imageUrl: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
    rating: 4.6,
    numberOfReviews: 74
  },
  {
    name: "Wireless Gaming Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI and precision tracking.",
    price: 1499,
    category: "Electronics",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1527814050087-3793815479db"],
    rating: 4.5,
    numberOfReviews: 61
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Portable speaker with powerful sound and compact design.",
    price: 2199,
    category: "Electronics",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"],
    rating: 4.4,
    numberOfReviews: 82
  },
  {
    name: "USB-C Fast Charger",
    description: "Fast charging USB-C adapter suitable for smartphones and tablets.",
    price: 899,
    category: "Electronics",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0"],
    rating: 4.2,
    numberOfReviews: 54
  },
  {
    name: "Power Bank 20000mAh",
    description: "High-capacity portable power bank with fast charging support.",
    price: 1599,
    category: "Electronics",
    stock: 65,
    imageUrl: ["https://images.unsplash.com/photo-1609592424371-1c8b1a6d8f8e"],
    rating: 4.3,
    numberOfReviews: 67
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for comfortable working.",
    price: 1299,
    category: "Electronics",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"],
    rating: 4.5,
    numberOfReviews: 48
  },
  {
    name: "Webcam Full HD",
    description: "Full HD webcam suitable for online classes, meetings and streaming.",
    price: 1899,
    category: "Electronics",
    stock: 30,
    imageUrl: ["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"],
    rating: 4.2,
    numberOfReviews: 39
  },

  {
    name: "Classic Cotton T-Shirt",
    description: "Comfortable regular-fit cotton t-shirt for everyday wear.",
    price: 599,
    category: "Fashion",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    rating: 4.4,
    numberOfReviews: 210
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with a modern casual fit.",
    price: 1999,
    category: "Fashion",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1551028719-00167b16eac5"],
    rating: 4.5,
    numberOfReviews: 86
  },
  {
    name: "Slim Fit Jeans",
    description: "Comfortable slim-fit denim jeans suitable for casual occasions.",
    price: 1599,
    category: "Fashion",
    stock: 70,
    imageUrl: ["https://images.unsplash.com/photo-1542272604-787c3835535d"],
    rating: 4.3,
    numberOfReviews: 132
  },
  {
    name: "Casual Hoodie",
    description: "Soft fleece hoodie designed for comfort and everyday style.",
    price: 1299,
    category: "Fashion",
    stock: 60,
    imageUrl: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7"],
    rating: 4.5,
    numberOfReviews: 98
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes designed for everyday comfort.",
    price: 1999,
    category: "Fashion",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    rating: 4.3,
    numberOfReviews: 87
  },
  {
    name: "Casual Sneakers",
    description: "Modern casual sneakers suitable for daily wear.",
    price: 1799,
    category: "Fashion",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"],
    rating: 4.4,
    numberOfReviews: 104
  },
  {
    name: "Formal Shirt",
    description: "Classic formal shirt suitable for office and professional occasions.",
    price: 999,
    category: "Fashion",
    stock: 80,
    imageUrl: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"],
    rating: 4.2,
    numberOfReviews: 65
  },
  {
    name: "Leather Wallet",
    description: "Compact leather wallet with multiple card slots.",
    price: 799,
    category: "Fashion",
    stock: 90,
    imageUrl: ["https://images.unsplash.com/photo-1627123424574-724758594e93"],
    rating: 4.5,
    numberOfReviews: 77
  },
  {
    name: "Classic Sunglasses",
    description: "Stylish sunglasses with a lightweight frame.",
    price: 699,
    category: "Fashion",
    stock: 85,
    imageUrl: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083"],
    rating: 4.3,
    numberOfReviews: 58
  },
  {
    name: "Winter Jacket",
    description: "Warm and comfortable jacket designed for cold weather.",
    price: 2499,
    category: "Fashion",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f"],
    rating: 4.6,
    numberOfReviews: 91
  },

  {
    name: "Ceramic Coffee Mug",
    description: "Minimal ceramic coffee mug for home and office use.",
    price: 399,
    category: "Home & Kitchen",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1514228742587-6b1558fcf93a"],
    rating: 4.7,
    numberOfReviews: 150
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Reusable insulated stainless steel water bottle.",
    price: 699,
    category: "Home & Kitchen",
    stock: 85,
    imageUrl: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8"],
    rating: 4.5,
    numberOfReviews: 112
  },
  {
    name: "Non Stick Frying Pan",
    description: "Durable non-stick frying pan for everyday cooking.",
    price: 1199,
    category: "Home & Kitchen",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f"],
    rating: 4.4,
    numberOfReviews: 76
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional kitchen knife set for everyday food preparation.",
    price: 1499,
    category: "Home & Kitchen",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1593618998160-e34014e67546"],
    rating: 4.5,
    numberOfReviews: 62
  },
  {
    name: "Table Lamp",
    description: "Modern table lamp with a minimalist design.",
    price: 899,
    category: "Home & Kitchen",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c"],
    rating: 4.3,
    numberOfReviews: 51
  },
  {
    name: "Decorative Plant Pot",
    description: "Modern decorative pot for indoor plants.",
    price: 499,
    category: "Home & Kitchen",
    stock: 70,
    imageUrl: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411"],
    rating: 4.6,
    numberOfReviews: 83
  },
  {
    name: "Soft Cushion Set",
    description: "Comfortable decorative cushion set for your living room.",
    price: 799,
    category: "Home & Kitchen",
    stock: 60,
    imageUrl: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2"],
    rating: 4.4,
    numberOfReviews: 45
  },
  {
    name: "Wall Clock",
    description: "Simple modern wall clock for home and office.",
    price: 599,
    category: "Home & Kitchen",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c"],
    rating: 4.2,
    numberOfReviews: 38
  },
  {
    name: "Electric Kettle",
    description: "Fast-boiling electric kettle with automatic shutoff.",
    price: 1399,
    category: "Home & Kitchen",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5"],
    rating: 4.5,
    numberOfReviews: 92
  },
  {
    name: "Storage Organizer",
    description: "Multi-purpose storage organizer for home and office.",
    price: 649,
    category: "Home & Kitchen",
    stock: 75,
    imageUrl: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7"],
    rating: 4.3,
    numberOfReviews: 49
  },

  {
    name: "Face Wash",
    description: "Gentle daily face wash for clean and refreshed skin.",
    price: 399,
    category: "Beauty",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1556228720-195a672e8a03"],
    rating: 4.4,
    numberOfReviews: 145
  },
  {
    name: "Moisturizing Cream",
    description: "Lightweight moisturizing cream for daily skincare.",
    price: 499,
    category: "Beauty",
    stock: 80,
    imageUrl: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"],
    rating: 4.5,
    numberOfReviews: 128
  },
  {
    name: "Perfume",
    description: "Elegant everyday fragrance with a refreshing scent.",
    price: 1299,
    category: "Beauty",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1541643600914-78b084683601"],
    rating: 4.6,
    numberOfReviews: 109
  },
  {
    name: "Lip Balm",
    description: "Moisturizing lip balm for soft and hydrated lips.",
    price: 199,
    category: "Beauty",
    stock: 150,
    imageUrl: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa"],
    rating: 4.3,
    numberOfReviews: 76
  },
  {
    name: "Makeup Brush Set",
    description: "Professional makeup brush set with multiple brush types.",
    price: 899,
    category: "Beauty",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348"],
    rating: 4.5,
    numberOfReviews: 64
  },
  {
    name: "Hair Dryer",
    description: "Powerful hair dryer with multiple heat and speed settings.",
    price: 1499,
    category: "Beauty",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1522338140262-f46f5913618a"],
    rating: 4.2,
    numberOfReviews: 57
  },
  {
    name: "Bath & Body Set",
    description: "Refreshing bath and body care set for everyday use.",
    price: 999,
    category: "Beauty",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8"],
    rating: 4.4,
    numberOfReviews: 43
  },
  {
    name: "Hair Care Kit",
    description: "Complete everyday hair care kit.",
    price: 799,
    category: "Beauty",
    stock: 60,
    imageUrl: ["https://images.unsplash.com/photo-1527799820374-dcf8e7f7a1a8"],
    rating: 4.3,
    numberOfReviews: 51
  },
  {
    name: "Face Serum",
    description: "Lightweight daily facial serum for a refreshed appearance.",
    price: 699,
    category: "Beauty",
    stock: 75,
    imageUrl: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be"],
    rating: 4.5,
    numberOfReviews: 94
  },
  {
    name: "Body Lotion",
    description: "Hydrating body lotion suitable for daily use.",
    price: 449,
    category: "Beauty",
    stock: 90,
    imageUrl: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc"],
    rating: 4.4,
    numberOfReviews: 68
  },

  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat designed for workouts and stretching.",
    price: 799,
    category: "Sports",
    stock: 70,
    imageUrl: ["https://images.unsplash.com/photo-1592432678016-e910b452f9a2"],
    rating: 4.6,
    numberOfReviews: 115
  },
  {
    name: "Dumbbell Set",
    description: "Compact dumbbell set for strength training at home.",
    price: 1999,
    category: "Sports",
    stock: 30,
    imageUrl: ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"],
    rating: 4.5,
    numberOfReviews: 72
  },
  {
    name: "Football",
    description: "Durable football suitable for training and recreational play.",
    price: 899,
    category: "Sports",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1579952363873-27f3bade9f55"],
    rating: 4.4,
    numberOfReviews: 64
  },
  {
    name: "Basketball",
    description: "Durable basketball suitable for indoor and outdoor courts.",
    price: 999,
    category: "Sports",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1546519638-68e109498ffc"],
    rating: 4.5,
    numberOfReviews: 58
  },
  {
    name: "Tennis Racket",
    description: "Lightweight tennis racket for recreational players.",
    price: 1499,
    category: "Sports",
    stock: 25,
    imageUrl: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8"],
    rating: 4.3,
    numberOfReviews: 42
  },
  {
    name: "Skipping Rope",
    description: "Adjustable skipping rope for cardio and fitness workouts.",
    price: 299,
    category: "Sports",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3"],
    rating: 4.4,
    numberOfReviews: 89
  },
  {
    name: "Gym Gloves",
    description: "Comfortable workout gloves with wrist support.",
    price: 499,
    category: "Sports",
    stock: 80,
    imageUrl: ["https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e"],
    rating: 4.3,
    numberOfReviews: 63
  },
  {
    name: "Resistance Bands",
    description: "Set of resistance bands for strength and mobility workouts.",
    price: 599,
    category: "Sports",
    stock: 65,
    imageUrl: ["https://images.unsplash.com/photo-1598289431512-b97b0917affc"],
    rating: 4.6,
    numberOfReviews: 91
  },
  {
    name: "Sports Water Bottle",
    description: "Lightweight reusable bottle designed for workouts.",
    price: 399,
    category: "Sports",
    stock: 90,
    imageUrl: ["https://images.unsplash.com/photo-1523362628745-0c100150b504"],
    rating: 4.4,
    numberOfReviews: 55
  },
  {
    name: "Fitness Backpack",
    description: "Spacious sports backpack for gym and outdoor activities.",
    price: 1299,
    category: "Sports",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.5,
    numberOfReviews: 47
  },

  {
    name: "The Art of Programming",
    description: "A practical introduction to programming concepts and problem solving.",
    price: 699,
    category: "Books",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1515879218367-8466d910aaa4"],
    rating: 4.7,
    numberOfReviews: 134
  },
  {
    name: "Modern Web Development",
    description: "Learn modern frontend and backend web development concepts.",
    price: 799,
    category: "Books",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1532012197267-da84d127e765"],
    rating: 4.5,
    numberOfReviews: 87
  },
  {
    name: "Data Structures Handbook",
    description: "Practical guide to data structures and algorithms.",
    price: 899,
    category: "Books",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"],
    rating: 4.8,
    numberOfReviews: 156
  },
  {
    name: "Machine Learning Basics",
    description: "Beginner-friendly introduction to machine learning concepts.",
    price: 749,
    category: "Books",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1484417894907-623942c8ee29"],
    rating: 4.4,
    numberOfReviews: 61
  },
  {
    name: "Database Systems",
    description: "Introduction to SQL, databases and database design.",
    price: 649,
    category: "Books",
    stock: 30,
    imageUrl: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f"],
    rating: 4.5,
    numberOfReviews: 73
  },
  {
    name: "JavaScript Guide",
    description: "Complete beginner-friendly guide to JavaScript programming.",
    price: 599,
    category: "Books",
    stock: 60,
    imageUrl: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3"],
    rating: 4.6,
    numberOfReviews: 91
  },
  {
    name: "Python Programming",
    description: "Practical Python programming guide for beginners.",
    price: 699,
    category: "Books",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1526379095098-d400fd0bf935"],
    rating: 4.7,
    numberOfReviews: 103
  },
  {
    name: "Clean Code Concepts",
    description: "Learn principles for writing readable and maintainable software.",
    price: 899,
    category: "Books",
    stock: 25,
    imageUrl: ["https://images.unsplash.com/photo-1516979187457-637abb4f9353"],
    rating: 4.8,
    numberOfReviews: 118
  },
  {
    name: "Computer Networks",
    description: "Fundamentals of computer networking and communication.",
    price: 749,
    category: "Books",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1495446815901-a7297e633e8d"],
    rating: 4.4,
    numberOfReviews: 52
  },
  {
    name: "Artificial Intelligence Guide",
    description: "Introduction to artificial intelligence and intelligent systems.",
    price: 849,
    category: "Books",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1535378917042-10a22c95931a"],
    rating: 4.6,
    numberOfReviews: 84
  },

  {
    name: "Premium Basmati Rice",
    description: "Long-grain premium basmati rice for everyday meals.",
    price: 699,
    category: "Grocery",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1586201375761-83865001e31c"],
    rating: 4.6,
    numberOfReviews: 143
  },
  {
    name: "Organic Green Tea",
    description: "Refreshing organic green tea leaves.",
    price: 349,
    category: "Grocery",
    stock: 90,
    imageUrl: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc"],
    rating: 4.5,
    numberOfReviews: 87
  },
  {
    name: "Roasted Coffee Beans",
    description: "Freshly roasted coffee beans with a rich aroma.",
    price: 599,
    category: "Grocery",
    stock: 75,
    imageUrl: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e"],
    rating: 4.7,
    numberOfReviews: 119
  },
  {
    name: "Mixed Dry Fruits",
    description: "Premium assortment of almonds, cashews and raisins.",
    price: 899,
    category: "Grocery",
    stock: 65,
    imageUrl: ["https://images.unsplash.com/photo-1599599810694-b5ac7f9ba5b4"],
    rating: 4.6,
    numberOfReviews: 76
  },
  {
    name: "Organic Honey",
    description: "Natural honey suitable for beverages and everyday meals.",
    price: 499,
    category: "Grocery",
    stock: 80,
    imageUrl: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38"],
    rating: 4.5,
    numberOfReviews: 93
  },
  {
    name: "Peanut Butter",
    description: "Creamy peanut butter made from roasted peanuts.",
    price: 399,
    category: "Grocery",
    stock: 85,
    imageUrl: ["https://images.unsplash.com/photo-1612182062633-9ff3b3598e3d"],
    rating: 4.4,
    numberOfReviews: 71
  },
  {
    name: "Oatmeal",
    description: "Healthy oats suitable for breakfast and baking.",
    price: 299,
    category: "Grocery",
    stock: 110,
    imageUrl: ["https://images.unsplash.com/photo-1517673400267-0251440c45dc"],
    rating: 4.3,
    numberOfReviews: 59
  },
  {
    name: "Dark Chocolate",
    description: "Rich dark chocolate bar with a smooth texture.",
    price: 199,
    category: "Grocery",
    stock: 120,
    imageUrl: ["https://images.unsplash.com/photo-1548907040-4d42f2c8c1b4"],
    rating: 4.6,
    numberOfReviews: 105
  },
  {
    name: "Organic Peanut Mix",
    description: "Crunchy roasted peanut snack for everyday consumption.",
    price: 249,
    category: "Grocery",
    stock: 100,
    imageUrl: ["https://images.unsplash.com/photo-1563298723-dcfebaa392e3"],
    rating: 4.2,
    numberOfReviews: 42
  },
  {
    name: "Fruit Granola",
    description: "Crunchy granola with dried fruits for a healthy breakfast.",
    price: 449,
    category: "Grocery",
    stock: 70,
    imageUrl: ["https://images.unsplash.com/photo-1517093157656-b9eccef91cb1"],
    rating: 4.5,
    numberOfReviews: 66
  },

  {
    name: "Travel Backpack",
    description: "Durable backpack suitable for travel, college and everyday use.",
    price: 1499,
    category: "Accessories",
    stock: 60,
    imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.6,
    numberOfReviews: 73
  },
  {
    name: "Classic Analog Watch",
    description: "Elegant analog watch suitable for everyday and formal wear.",
    price: 1899,
    category: "Accessories",
    stock: 40,
    imageUrl: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d"],
    rating: 4.5,
    numberOfReviews: 81
  },
  {
    name: "Leather Belt",
    description: "Classic leather belt with a durable metal buckle.",
    price: 699,
    category: "Accessories",
    stock: 75,
    imageUrl: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc"],
    rating: 4.4,
    numberOfReviews: 53
  },
  {
    name: "Canvas Backpack",
    description: "Casual canvas backpack with multiple storage compartments.",
    price: 1199,
    category: "Accessories",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"],
    rating: 4.3,
    numberOfReviews: 47
  },
  {
    name: "Travel Duffle Bag",
    description: "Spacious duffle bag for short trips and weekend travel.",
    price: 1399,
    category: "Accessories",
    stock: 45,
    imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.5,
    numberOfReviews: 59
  },
  {
    name: "Card Holder",
    description: "Slim card holder for everyday essentials.",
    price: 399,
    category: "Accessories",
    stock: 90,
    imageUrl: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3"],
    rating: 4.2,
    numberOfReviews: 38
  },
  {
    name: "Keychain",
    description: "Minimal metal keychain with a stylish finish.",
    price: 199,
    category: "Accessories",
    stock: 150,
    imageUrl: ["https://images.unsplash.com/photo-1627123424574-724758594e93"],
    rating: 4.1,
    numberOfReviews: 31
  },
  {
    name: "Laptop Sleeve",
    description: "Protective padded laptop sleeve for everyday travel.",
    price: 799,
    category: "Accessories",
    stock: 65,
    imageUrl: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef"],
    rating: 4.5,
    numberOfReviews: 62
  },
  {
    name: "Travel Organizer",
    description: "Compact organizer for cables, chargers and accessories.",
    price: 599,
    category: "Accessories",
    stock: 70,
    imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.4,
    numberOfReviews: 44
  },
  {
    name: "Minimalist Backpack",
    description: "Modern everyday backpack with a clean minimalist design.",
    price: 1599,
    category: "Accessories",
    stock: 55,
    imageUrl: ["https://images.unsplash.com/photo-1491637639811-60e2756cc1c7"],
    rating: 4.6,
    numberOfReviews: 78
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `${insertedProducts.length} products added successfully to MarketLane!`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error adding products:", error);
    process.exit(1);
  }
};

seedProducts();