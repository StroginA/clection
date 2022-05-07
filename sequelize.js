const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
    'postgres://qxluyvrcooexya:53d31d94d272cf211b6048b010e416dfe9c0328587b8be224fcc3345ab97fa9c@ec2-54-170-90-26.eu-west-1.compute.amazonaws.com:5432/d4a7d8fcarbtit'
    ,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

module.exports.sequelize = sequelize;