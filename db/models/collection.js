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
        description: DataTypes.TEXT,
        imageSource: {
            type: DataTypes.STRING
        },
        num0: DataTypes.STRING,
        num1: DataTypes.STRING,
        num2: DataTypes.STRING,
        str0: DataTypes.STRING,
        str1: DataTypes.STRING,
        str2: DataTypes.STRING,
        txt0: DataTypes.STRING,
        txt1: DataTypes.STRING,
        txt2: DataTypes.STRING,
        dat0: DataTypes.STRING,
        dat1: DataTypes.STRING,
        dat2: DataTypes.STRING,
        chk0: DataTypes.STRING,
        chk1: DataTypes.STRING,
        chk2: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Collection',
    });
    return Collection;
};