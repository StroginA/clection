const { query } = require('express');
const db = require('../db/models/index');

const connectionCheck = (req, res, next) => {
    res.status(200).json({
        body: 'Connection to server established.'
    }); 
};

const dbConnectionCheck = async (req, res, next) => {
    try {
        await db.sequelize.authenticate();
        res.status(200).json({
            body: 'Connection to DB established.'
        }); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;