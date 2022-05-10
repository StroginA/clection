'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Items',
      [{
        name: "War and Peace",
        CollectionId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jack Daniels",
        CollectionId: 2,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Super Mario 64",
        CollectionId: 3,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
