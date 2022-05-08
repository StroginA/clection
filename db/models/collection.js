'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { onDelete: 'CASCADE' });
            this.hasMany(models.Item);
            this.hasMany(models.CustomField);
        }
    }
    Collection.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
    }, {
        sequelize,
        modelName: 'Collection',
    });
    return Collection;
};