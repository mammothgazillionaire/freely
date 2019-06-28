const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const middleware = require('../../modules/middleware');
const productController = require('../../controller/productController');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/products', productController.allProducts);

router.use(middleware.loginMiddleware);

router.post('/product',productController.createProduct);




module.exports = router;