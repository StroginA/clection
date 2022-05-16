'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { onDelete: 'CASCADE' });
            this.belongsTo(models.Collection, { onDelete: 'CASCADE' });
            this.hasMany(models.Snippet);
            this.hasMany(models.Comment);
            this.belongsToMany(models.User, {through: models.UserItem, as: 'UserItems', foreignKey: 'ItemId', onDelete: 'cascade'});
            this.belongsToMany(models.Tag, {through: 'ItemTags'});
        }
    }
    Item.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Item',
    });
    return Item;
};