const express = require('express');
const { body } = require('express-validator');

const orderController = require('../controllers/order');
const userAppender = require('../middlewares/user-appender');
const isAuthenticated = require('../middlewares/is-authenticated');

const router = express.Router();

router.get('/orders', isAuthenticated, orderController.getOrders);

router.post('/order', [
    body('firstName').trim().isLength({ min: 1 }),
    body('lastName').trim().isLength({ min: 1 }),
    body('phoneNumber').trim().isLength({ min: 1 }),
    body('address').trim().isLength({ min: 1 }),
    body('items').not().isEmpty(),
    body('email').isEmail(),
    body('price').not().isEmpty(),
], userAppender, orderController.createOrder);


module.exports = router;
