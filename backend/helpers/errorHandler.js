exports.globalErrorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
};

exports.dbErrorHandler = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
};

exports.validationErrorHandler = (errors) => {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    error.data = errors;
    throw error;
};

exports.missingFileErrorHandler = (fileType) => {
    const error = new Error(`No ${ fileType } provided.`);
    error.statusCode = 422;
    throw error;
};

exports.missingItemErrorHandler = (itemType) => {
    const error = new Error(`Could not find ${ itemType }.`);
    error.statusCode = 404;
    throw error;
};
