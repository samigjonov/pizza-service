const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decodedToken = jwt.verify(token, 'secret');
            if (decodedToken) {
                req.userId = decodedToken.userId;
            }
        } catch (err) {
        }
    }
    next();
};
