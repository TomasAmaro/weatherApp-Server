const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require ('./config');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const apiRouter = require('./api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(cors());
app.use('/api', apiRouter);
mongoose.connect(config.dbPath);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));


app.listen(config.PORT, () => {
    console.log(`Server running on port: ${config.PORT}`);
});