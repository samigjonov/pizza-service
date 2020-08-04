require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const multer = require('./helpers/multer');
const cors = require('./helpers/cors');
const errorHandler = require('./helpers/errorHandler');
const app = express();

app.use(bodyParser.json());
app.use(multer);
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS is enabled
app.use(cors);

// Handling thrown errors
app.use(errorHandler);

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
