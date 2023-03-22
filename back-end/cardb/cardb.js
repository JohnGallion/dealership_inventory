const { Sequelize, INTEGER } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host:'127.0.0.1',
  dialect:'postgres'
});

const MyImage = sequelize.define('MyImage', {
  image: {
    type: Sequelize.BLOB('long'),
    allowNull: false
  }
});


const { DataTypes } = require('sequelize');

const Inventory = sequelize.define('Inventory', {
  make: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false
  }
});

const fs = require('fs');
const path = require('path');

const car1Image = fs.readFileSync(path.join(__dirname, '../assets/car1.jpg'));
const car2Image = fs.readFileSync(path.join(__dirname, '../assets/car2.jpg'));
const car3Image = fs.readFileSync(path.join(__dirname, '../assets/car3.jpg'));
const car4Image = fs.readFileSync(path.join(__dirname, '../assets/car4.jpg'));


async function createInventoryItem() {
 const car1 = await Inventory.create({
  make: 'AUDI',
  model: 'Q7',
  year: 2014,
  mileage:INTEGER, 
  price:INTEGER,
  image: car1Image,
});

const car2 = await Inventory.create({
  make: 'BMW',
  model: '4 SERIES',
  year: 2015, 
  mileage:INTEGER, 
  price:INTEGER,
  image: car2Image
});

const car3 = await Inventory.create({
  make: 'AUDI',
  model: 'RS 5',
  year: 2022, 
  mileage:INTEGER, 
  price:INTEGER,
  image: car3Image
});

const car4 = await Inventory.create({
  make: 'BMW',
  model: '4 SERIES',
  year: 2015, 
  mileage:INTEGER, 
  price:INTEGER,
  image: car4Image
});

const cars = await Inventory.findAll();
cars.forEach(Inventory => {
   console.log(`${Inventory.make} ${Inventory.model}: ${Inventory.image.length} bytes`);
  // console.log(car1Image)
})};
createInventoryItem();
// await sequelize.sync();
