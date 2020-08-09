require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const multer = require('./helpers/multer');
const cors = require('./helpers/cors');
const { globalErrorHandler } = require('./helpers/errorHandler');

const pizzaRoutes = require('./routes/pizza');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const rateRoutes = require('./routes/rate');
const app = express();

app.use(bodyParser.json());
app.use(multer);
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS is enabled
app.use(cors);



app.use('/api', pizzaRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', rateRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Handling thrown errors
app.use(globalErrorHandler);

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT || 3500);
    })
    .catch(err => console.log(err));
