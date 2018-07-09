const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('../config/winston.js');

const app = express();
const router = express.Router();

//Connect DB
mongoose.connect('mongodb://crudapiuser:passCrudApi7@ds129051.mlab.com:29051/crudapi', { useNewUrlParser: true });

// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open mongodb://ds129051.mlab.com:29051/crudapi');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    logger.info('Mongoose default connection error: ' + err);
});

//Call models
const Task = require('./models/task-models');

//Call routes 
const routeIndex = require('./routes/index');
const routeTask = require('./routes/task-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routeIndex);
app.use('/task', routeTask);

module.exports = app;