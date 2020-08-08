const { dbErrorHandler } = require('../helpers/errorHandler');

const { getCurrencyFromDb } = require('../helpers/currencyApi');

exports.getRate = (req, res, next) => {
    getCurrencyFromDb().then(result => {
        res.status(200).json({
            eur: result.eur
        })
    }).catch(error => {
        dbErrorHandler(error, next);
    })
};
