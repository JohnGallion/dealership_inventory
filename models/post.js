'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    make:DataTypes.STRING,
    type:DataTypes.STRING,
    year:DataTypes.STRING,
    price:DataTypes.STRING,
    // title: DataTypes.STRING,
    // content: DataTypes.STRING,
    // date: DataTypes.DATE,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};