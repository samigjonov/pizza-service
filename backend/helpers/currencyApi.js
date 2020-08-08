const axios = require('axios');

const { dbErrorHandler } = require('../helpers/errorHandler');
const Rate = require('../models/rate');

const fetchCurrency = () => {
    return axios.get('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR')
        .then(response => {
            return Promise.resolve(response.data.rates);
        })
        .catch(error => {
            return Promise.reject('Error occurred!');
        });
};

exports.getCurrencyFromDb = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Rate.find({ createdAt: { $gte: today } })
        .then(result => {
            if (!result.length) {
                return fetchCurrency().then(result => {
                    const rate = new Rate({
                        eur: result.EUR
                    });
                    return rate.save();
                });
            }
            return Promise.resolve(result[0]);
        })
        .catch(err => {
            dbErrorHandler(err, next);
        });
};
