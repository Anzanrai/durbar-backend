const db = require('../models');
const formidable = require('formidable');
const _ = require('lodash');

const Order = db.order;

const createOrder = (req, res) => {
  // Order.create({
  //   customerName: req.body.customerName,
  //   orderType: req.body.orderType,
  //   tableNumber: req.body.tableNumber,
  // })
  //   .then((order) => {
  //     order.setUsers(req.profile.id);
  //     return res
  //       .status(201)
  //       .send({ message: 'Order created successfully.', data: order });
  //   })
  //   .catch((error) => {
  //     return res.status(400).send({ message: error.message });
  //   });
  let form = new formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.',
      });
    }
    const order = Order.build(fields);
    order.setUsers(req.profile.id);
    order
      .save()
      .then((data) => {
        res.status(201).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  });
};

const getOrders = (req, res) => {
  Order.findAll()
    .then((orders) => {
      res.status(200).send({ orders: orders });
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Something Went Wrong. Orders data could not be retrieved.',
      });
    });
};

const orderById = (req, res, next, id) => {
  Order.findByPk(id)
    .then((order) => {
      req.activeOrder = order;
      next();
    })
    .catch((error) => {
      res.status(400).send({ message: 'Order data could not be retrieved.' });
    });
};

const getOrderById = (req, res) => {
  if (req.activeOrder) {
    return res.status(200).send({ data: req.activeOrder });
  }
  return res
    .status(400)
    .send({ message: 'Order data could not be retrieved.' });
};

const updateOrder = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.',
      });
    }
    let order = req.activeOrder;
    order = _.extend(order, fields);
    order
      .save()
      .then((data) => {
        res.status(200).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  });
};

const deleteOrder = (req, res) => {
  let order = req.activeOrder;
  order
    .destroy()
    .then((data) => {
      return res.status(200).send({ message: 'Order deleted successfully' });
    })
    .catch((error) => {
      return res.status(400).send({
        message: 'Something went wrong. Could not delete the order.',
      });
    });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  orderById,
  updateOrder,
  deleteOrder,
};
