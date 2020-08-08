const { validationResult } = require('express-validator');

const { dbErrorHandler, validationErrorHandler, missingFileErrorHandler, missingItemErrorHandler } = require('../helpers/errorHandler');
const { clearImage } = require('../helpers/image-manipulate');

const Pizza = require('../models/pizza').pizzaModel;


exports.getPizzas = (req, res, next) => {
    Pizza.find()
        .then(pizzas => {
            res.status(200).json({
                message: 'Pizzas fetched successfully.',
                data: pizzas
            })
        })
        .catch(err => {
            dbErrorHandler(err, next);
        })
};

exports.createPizza = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        validationErrorHandler();
    }
    if (!req.file) {
        missingFileErrorHandler('image');
    }

    const imageUrl = req.file.path;
    const { title, description, price } = req.body;

    const pizza = new Pizza({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl
    });

    pizza.save()
        .then(result => {
            res.status(201).json({
                message: 'Pizza created successfully.',
                data: result
            })
        })
        .catch(err => {
            dbErrorHandler(err);
        })
};

exports.getPizza = (req, res, next) => {
    const pizzaId = req.params.pizzaId;
    Pizza.findById(pizzaId)
        .then(pizza => {
            if (!pizza) {
                missingItemErrorHandler('pizza')
            }
            res.status(200).json({
                message: 'Pizza fetched.',
                data: pizza
            })
        })
        .catch(err => {
            dbErrorHandler(err);
        })
};

exports.updatePizza = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        validationErrorHandler();
    }
    const pizzaId = req.params.pizzaId;
    let { title, description, price, imageUrl } = req.body;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        missingFileErrorHandler('image');
    }

    Pizza.findById(pizzaId)
        .then(pizza => {
            if (!pizza) {
                missingItemErrorHandler('pizza')
            }
            if (imageUrl !== pizza.imageUrl) {
                clearImage(pizza.imageUrl);
            }
            pizza.title = title;
            pizza.description = description;
            pizza.price = price;
            pizza.imageUrl = imageUrl;
            return pizza.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Pizza updated.', data: result });
        })
        .catch(err => {
            dbErrorHandler(err);
        })
};

exports.deletePizza = (req, res, next) => {
    const pizzaId = req.params.pizzaId;
    Pizza.findById(pizzaId)
        .then(pizza => {
            if (!pizza) {
                missingItemErrorHandler('pizza');
            }
            clearImage(pizza.imageUrl);
            return Pizza.findByIdAndRemove(pizzaId);
        })
        .then(() => {
            res.status(200).json({ message: 'Pizza deleted.' })
        })
        .catch(err => {
            dbErrorHandler(err);
        })
};
