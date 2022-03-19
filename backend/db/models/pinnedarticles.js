'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PinnedArticles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PinnedArticles.belongsTo(models.User,{
        foreignKey: 'userId'
      });
    }
  };
  PinnedArticles.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: DataTypes.STRING,
    abstract: DataTypes.STRING,
    byline: DataTypes.STRING,
    short_url: DataTypes.STRING,
    image: DataTypes.STRING,
    published_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PinnedArticles',
  });
  return PinnedArticles;
};
