'use strict';
const app = require('express')();
const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const morgan = require('morgan')


const root = path.join(__dirname, '/../public/');

var todoApi = require('./api/todo');

app.use(express.static(root));
app.use(cors());
app.use(morgan('tiny'));
app.use(fallback('index.html', {root: root}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use('/', todoApi);


app.use(function(err, req, res, next) {
    req.accepts('application/json');
    next();
});

app.use(function(err, req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

module.exports = app;
