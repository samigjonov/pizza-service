const express = require('express');

const rateController = require('../controllers/rate');

const router = express.Router();

router.get('/rate', rateController.getRate);


module.exports = router;
