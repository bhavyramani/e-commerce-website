const express = require('express');
const router = express.Router();
const {addToCart, fetchCartByUser, deleteFromCart, updateCart} = require('../controllers/Cart');

router.post('/', addToCart);
router.get('/:user', fetchCartByUser);
router.delete('/:id', deleteFromCart);
router.patch('/:id', updateCart);
exports.router = router;