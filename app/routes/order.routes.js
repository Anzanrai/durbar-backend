const express = require('express');
const {
  isModeratorOrAdmin,
  verifyToken,
  userById,
} = require('../middleware/authJwt');
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  orderById,
} = require('../controllers/order.controller');

const router = express.Router();

router.get('/:userId', isModeratorOrAdmin, getOrders);
router.get('/:userId/:orderId', isModeratorOrAdmin, getOrderById);
router.post('/:userId', verifyToken, createOrder);
router.put('/:userId/:orderId', isModeratorOrAdmin, updateOrder);
router.delete('/:userId/:orderId', isAdmin, deleteOrder);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
