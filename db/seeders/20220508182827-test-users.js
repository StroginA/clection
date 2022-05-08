'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [{
        name: 'foo',
        password: 'bar',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'bar',
        password: 'baz',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'baz',
        password: 'foo',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
