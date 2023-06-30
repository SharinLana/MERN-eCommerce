const Order = require("../models/OrderModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: new ObjectId(req.user._id) });

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserOrders };
