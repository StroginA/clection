'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        isBlocked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      }
    );

    await queryInterface.createTable(
      'Collections',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        imageSource: {
          type: DataTypes.STRING
        }
      }
    );

    await queryInterface.createTable(
      'CustomFields',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    );

    await queryInterface.createTable(
      'Items',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    );
    
    await queryInterface.createTable(
      'Snippets',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      }
    );

    await queryInterface.createTable(
      'Comments',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      }
    );

    await queryInterface.createTable(
      'Tags',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('Users');
     await queryInterface.dropTable('Collections');
     await queryInterface.dropTable('CustomFields');
     await queryInterface.dropTable('Items');
     await queryInterface.dropTable('Snippets');
     await queryInterface.dropTable('Comments');
     await queryInterface.dropTable('Tags');
  }
};
