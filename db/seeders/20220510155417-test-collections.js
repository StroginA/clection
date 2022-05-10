'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Collections',
      [{
        name: "Russian Lit",
        category: "Books",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        name: "Whiskeys",
        category: "Alcohol",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },
      {
        name: "Nintendo Cartridges",
        category: "Media",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Collections', null, {});
  }
};
