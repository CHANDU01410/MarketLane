const Order=require('../model/order');
const Product=require('../model/product');
const User=require('../model/user');

const getAdminStats=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments({role:'user'});
        const totalOrders=await Order.countDocuments({});
        const totalProducts=await Product.countDocuments({});
        const orders=await Order.find({});

        const totalRevenueData= await orders.reduce((acc,order)=>acc+order.totalAmount,0);
        res.status(200).json({
            totalUsers,totalOrders,totalProducts,totalRevenue:totalRevenueData
        });
    }
    catch(error){
        res.status(500).json({message:'Error fetching stats',error});
    }   
};

module.exports={getAdminStats};