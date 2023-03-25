// Define constant global variables
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require('./logger');
const ejs = require('ejs');
const sequelize = require('sequelize');
const cars = require('../cardb/models')
const db = require('../cardb/models')
const make= require('../cardb/models')
app.use(bodyParser.json())

app.set('view engine', 'ejs')

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
app.get('/inventory', async (req, res) => {
    const carList = await db.cars.findAll();
    //const cararr = Array.from(carList)
    res.render('inventory', {list : carList})
    //res.send(carList)
})

app.post('/inventory', async (req, res) => {
    const carList = await db.cars.findAll();

    await db.cars.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price
    } )
    res.render('inventory', {list : carList} )
    //res.send('new car added to DB')
})

app.post('/inventory/delete/:id', async (req, res) => {
    const carList = await db.cars.findAll();

    await db.cars.destroy({
        where: {
          id: req.params.id
        }
      });
     res.render('inventory', {list : carList})
    //res.send(`car with id:${req.params.id} was deleted`)
})

app.put('/inventory/edit/:id', (req, res) => {
    res.send('inventory put endpoint called')
})

//user DB endpoints
app.get('/user', (req, res) => {

    res.render('login' )
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