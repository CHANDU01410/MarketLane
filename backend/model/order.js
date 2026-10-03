const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        address: {
            fullName: {
                type: String,
                required: true
            },

            street: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            postalCode: {
                type: String,
                required: true
            },

            country: {
                type: String,
                required: true
            }
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        paymentId: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);