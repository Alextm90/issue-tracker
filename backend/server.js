'use strict';
const express = require('express');
const cors = require('cors');
const issue = require('./routes/issueRoutes.js');
const user = require('./routes/authRoutes.js');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', issue);
app.use('/', user);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type('text').send('Not Found');
});

const listener = app.listen(10000, '0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; //for testing
