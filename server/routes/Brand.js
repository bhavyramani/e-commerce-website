const express = require('express');
const { fetchBrands, createBrand } = require('../controllers/Brand');

const router = express.Router();
router.get('/', fetchBrands);
router.post('/', createBrand);

exports.router = router;