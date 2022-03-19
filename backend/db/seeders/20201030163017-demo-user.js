'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fake1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fake2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null , {});
  }
};
