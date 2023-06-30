const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
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

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;

    if (!(cartItems && orderTotal && paymentMethod)) {
      res
        .status(400)
        .send("All inputs are required: cartItems, orderTotal, paymentMethod!");
    }

    // Need to get the product ids and qty to update the "sales" property in the Products collection.
    let productIds = cartItems.map((item) => {
      return item.productId;
    });

    let productQty = cartItems.map((item) => {
      return Number(item.quantity);
    });
    console.log(productQty); // [2, 1, 3, 1]

    await Product.find({ _id: { $in: productIds } }).then((products) => {
      products.forEach((product, index) => {
        // extracting each elem from the productQty array by the index and sum them up for each product
        product.sales += productQty[index];
        product.save();
      });
    });

    const order = new Order({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();

    const paidOrder = await order.save();

    res.status(200).json(paidOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToBeDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const deliveredOrder = await order.save();

    res.status(200).json(deliveredOrder);
  } catch (err) {
    next(err);
  }
};

const adminGetAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" })
      .orFail();

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserOrders,
  getOrderDetails,
  createOrder,
  updateOrderToPaid,
  updateOrderToBeDelivered,
  adminGetAllOrders,
};
