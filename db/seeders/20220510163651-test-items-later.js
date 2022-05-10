'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Items',
      [{
        name: "Brothers Karamazov",
        CollectionId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lagavulin",
        CollectionId: 2,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Woe of Wit",
        CollectionId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
