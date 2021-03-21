

const express = require('express');
const path = require('path');
const dbConnectionRouter = require('./routes/dbConnection');
const app = express();

const indexRouter = require('./routes/index');
const comp4537Router = require('./routes/comp4537');

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', dbConnectionRouter);
app.use('/comp4537', comp4537Router);

module.exports = app;
