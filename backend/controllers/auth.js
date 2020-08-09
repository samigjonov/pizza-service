const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbErrorHandler, validationErrorHandler, missingItemErrorHandler } = require('../helpers/errorHandler');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        validationErrorHandler(errors.errors);
    }
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                firstName: firstName,
                password: hashedPassword,
                lastName: lastName,
                phoneNumber: phoneNumber
            });
            return user.save();
        })
        .then(result => {
            const token = jwt.sign({
                email: result.email,
                userId: result._id.toString(),
                firstName: result.firstName,
                lastName: result.lastName,
                phoneNumber: result.phoneNumber
            }, 'secret', { expiresIn: '1h' });
            res.status(201).json({
                message: 'User created.',
                data: {
                    token: token,
                    _id: result._id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    phoneNumber: result.phoneNumber
                }
            })
        })
        .catch(err => {
            dbErrorHandler(err, next)
        })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                missingItemErrorHandler('user')
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
                firstName: loadedUser.firstName,
                lastName: loadedUser.lastName,
                phoneNumber: loadedUser.phoneNumber
            }, 'secret', { expiresIn: '1h' });
            res.status(200).json({
                message: 'Logged in.',
                data: {
                    token: token,
                    _id: loadedUser._id,
                    email: loadedUser.email,
                    firstName: loadedUser.firstName,
                    lastName: loadedUser.lastName,
                    phoneNumber: loadedUser.phoneNumber
                }
            });

        })
        .catch(err => {
            dbErrorHandler(err, next);
        })
};


exports.profile = (req, res, next) => {
    const userId = req.userId;
    if (userId) {
        User.findById(userId)
            .then(user => {
                res.status(200).json({
                    message: 'User fetched.',
                })
            })
            .catch(err => {
                dbErrorHandler(err, next);
            })
    } else {
        res.status(422).json({
            message: 'User not found.'
        })
    }

};
