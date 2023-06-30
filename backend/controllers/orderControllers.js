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

const getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserOrders, getOrderDetails };
