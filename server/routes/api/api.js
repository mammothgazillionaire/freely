const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

const productController = require('../../controller/productController');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/product', productController.createProduct);

module.exports = router;