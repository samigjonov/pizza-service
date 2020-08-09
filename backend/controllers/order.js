const { validationResult } = require('express-validator');

const { dbErrorHandler, validationErrorHandler, missingItemErrorHandler } = require('../helpers/errorHandler');

const Order = require('../models/order');
const Pizza = require('../models/pizza').pizzaModel;
const User = require('../models/user');
const { getCurrencyFromDb } = require('../helpers/currencyApi');
exports.getOrders = (req, res, next) => {
    const userId = req.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                missingItemErrorHandler('user');
            }
            return Order
                .find({
                    '_id': { $in: user.orders }
                }).then(orders => {
                    res.status(200).json({
                        message: 'Orders fetched successfully.',
                        data: orders
                    })
                })
        }).catch(err => {
        dbErrorHandler(err, next);
    })
};


exports.createOrder = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        validationErrorHandler();
    }

    const { firstName, lastName, phoneNumber, address, items, email, price } = req.body;
    let totalPrice = 0;
    const orderedItems = Object.keys(items);
    const transformedItems = [];
    let order;
    getCurrencyFromDb().then(rate => {
        Pizza
            .find({
                '_id': { $in: orderedItems }
            })
            .then(pizzas => {
                for (let pizza of pizzas) {
                    totalPrice += pizza.price * items[pizza._id];
                    transformedItems.push({
                        item: pizza,
                        quantity: items[pizza._id]
                    })
                }
                order = new Order({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    address: address,
                    email: email,
                    items: transformedItems,
                    totalPrice: {
                        usd: totalPrice.toFixed(2),
                        eur: (totalPrice * rate.eur).toFixed(2)
                    }
                });
                return order.save();
            })
            .then(result => {
                const userId = req.userId;
                if (userId) {
                    User.findById(userId)
                        .then(user => {
                            user.orders.push(order);
                            return user.save();
                        })
                        .then(result => {
                            res.status(201).json({
                                message: 'Order created.',
                                data: order
                            });
                        });
                } else {
                    res.status(201).json({
                        message: 'Order created.',
                        data: result
                    });
                }
            })
    }).catch(err => {
        dbErrorHandler(err, next);
    });
};
