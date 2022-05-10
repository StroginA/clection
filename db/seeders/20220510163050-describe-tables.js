'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users =  await queryInterface.describeTable({tableName: 'Users'});
    console.log(users);
    const collections =  await queryInterface.describeTable({tableName: 'Collections'});
    console.log(collections);
    const items =  await queryInterface.describeTable({tableName: 'Items'});
    console.log(items);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
