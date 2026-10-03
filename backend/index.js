const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const path = require("path");
dotenv.config();

const connectDB=require("./config/db");


const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000",process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));
connectDB();

app.get('/',(req,res)=>{
    res.status(200).json("MarketLane Backend  is working properly!");
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
    });
}
else{
    app.get("/",(req,res)=>{
        res.send("API is running..");
    });
} 

const PORT =process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log(`Server is running successfully on port ${PORT}`);
});

