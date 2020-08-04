const express = require('express');
const { body } = require('express-validator');

const pizzaController = require('../controllers/pizza');

const router = express.Router();

router.get('/pizzas', pizzaController.getPizzas);

router.post('/pizza', [
    body('title').trim().isLength({ min: 5 }),
    body('description').trim().isLength({ min: 10 }),
    body('price').isFloat({ gt: 0 })
], pizzaController.createPizza);

router.get('/pizza/:pizzaId', pizzaController.getPizza);

router.put('/pizza/:pizzaId', [
    body('title').trim().isLength({ min: 5 }),
    body('description').trim().isLength({ min: 10 }),
    body('price').isFloat({ gt: 0 })
], pizzaController.updatePizza);

router.delete('/pizza/:pizzaId', pizzaController.deletePizza);


module.exports = router;
