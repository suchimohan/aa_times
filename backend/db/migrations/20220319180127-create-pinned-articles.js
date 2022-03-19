'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PinnedArticles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users"
        },
      },
      title: {
        type: Sequelize.STRING
      },
      abstract: {
        type: Sequelize.STRING
      },
      byline: {
        type: Sequelize.STRING
      },
      short_url: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      published_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PinnedArticles');
  }
};
