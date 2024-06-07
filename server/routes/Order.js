const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrders } = require('../controllers/Order');

const router = express.Router();
router.post('/', createOrder);
router.get('/user/:userId', fetchOrdersByUser);
router.delete('/:id', deleteOrder);
router.patch('/:id', updateOrder);
router.get('/', fetchAllOrders);


exports.router = router;