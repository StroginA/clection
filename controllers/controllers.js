const connectionCheck = (req, res, next) => {
    res.status(200).json({
        body: 'Connection to server established.'
    }); 
};

const dbConnectionCheck = async (req, res, next) => {
    const { testFetch } = require('../testFetch');
    const testData = await testFetch();
    res.status(200).json({
        body: testData
    }); 
};

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;