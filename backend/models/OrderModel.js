const mongoose = require("mongoose");
const User = require("./UserModel");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The order must be connected to a User"],
      ref: User,
    },
    orderTotal: {
      itemsCount: {
        type: Number,
        required: [true, "Please provide a total number of items"],
      },
      cartSubtotal: {
        type: Number,
        required: [true, "Please provide a total price"],
      },
    },
    cartItems: [
      {
        name: { type: String, required: [true, "Cart item must have a name"] },
        price: {
          type: Number,
          required: [true, "Cart item must have a price"],
        },
        image: {
          path: {
            type: String,
            required: [true, "Cart item must have an image"],
          },
        },
        quantity: {
          type: Number,
          required: [true, "Cart item must have a quantity"],
        },
        count: {
          type: Number,
          required: [true, "Cart item must have a subtotal price"],
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
