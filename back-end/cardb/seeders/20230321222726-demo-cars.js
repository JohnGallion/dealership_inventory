'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('inventories', [
      {
        make: 'AUDI',
        model: 'Q7',
        year: 2014,
        mileage: 100000, 
        price: 30000,
        image: 'car1Image',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        make: 'BMW',
        model: '4 SERIES',
        year: 2015, 
        mileage:2000, 
        price:14000,
        image: 'car2Image',
        createdAt:new Date(),
        updatedAt: new Date(),

      },
      {
        make: 'AUDI',
        model: 'RS 5',
        year: 2022, 
        mileage:55000, 
        price:27000,
        image: 'car3Image',
        createdAt:new Date(),
        updatedAt: new Date(),
      },
      {
        make: 'BMW',
        model: '4 SERIES',
        year: 2015, 
        mileage:45895, 
        price:18000,
        image: 'car4Image',
        createdAt:new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
