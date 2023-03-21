// Define constant global variables
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require('./logger');
const ejs = require('ejs');
const {Sequelize} = require('sequelize');



// logger function
app.all('*', (req, res, next) => {
logger.info({
    method: req.method,
    path: req.path,
    parameters: req.params,
    body: req.body,
    timestamp: new Date()
  })
  next()
})

//inventory DB endpoints
app.get('/inventory', (req, res) => {
    res.send('inventory get endpoint called')
})

app.post('/inventory', (req, res) => {
    res.send('inventory post endpoint called')
})

app.delete('/inventory/delete/:id', (req, res) => {
    res.send('inventory delete endpoint called')
})

app.put('/inventory/edit/:id', (req, res) => {
    res.send('inventory put endpoint called')
})

//user DB endpoints
app.get('/user', (req, res) => {
    res.send('user get endpoint called')
})

app.post('/user', (req, res) => {
    res.send('user post endpoint called')
})

app.delete('/user/delete/:id', (req, res) => {
    res.send('user delete endpoint called')
})

app.put('/user/edit/:id', (req, res) => {
    res.send(' user put endpoint called')
})


app.listen(5500, () => {
    console.log('Server is running on Port 5500')
})