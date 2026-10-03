const Order = require("../model/order");
const sendEmail = require("../utils/sendEmail");


console.log("REGISTERED MODELS:", Object.keys(require("mongoose").models));


const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (
            !req.user ||
            !items ||
            items.length === 0 ||
            totalAmount == null ||
            !address ||
            !paymentId
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newOrder = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        const savedOrder = await newOrder.save();

        await savedOrder.populate("user", "name email");

        const message = `Dear ${savedOrder.user.name},

Your order has been successfully placed.

Order ID: ${savedOrder._id}

Shipping Address:
${savedOrder.address.street},
${savedOrder.address.city},
${savedOrder.address.postalCode},
${savedOrder.address.country}

Total Amount: ${savedOrder.totalAmount}

Thank you for shopping with us!

Best regards,
MarketLane Team`;

        await sendEmail(
            savedOrder.user.email,
            "MarketLane - Order Confirmation",
            message
        );

        res.status(201).json(savedOrder);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
};


const myOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id
        }).populate(
            "items.productId",
            "name price"
        );

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const existingOrder = await Order.findById(req.params.id);

        if (!existingOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        existingOrder.status = status;

        const updatedOrder = await existingOrder.save();

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json({
            message: "Error updating order status",
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};