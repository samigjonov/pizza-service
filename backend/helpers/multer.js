const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');
