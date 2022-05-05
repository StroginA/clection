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

const signinAttempt = (req, res, next) => {
    // stub
    if (req.body.auth.username === 'foo' && req.body.auth.password === 'bar') {
        res.status(200).json({
            body: 'success'
        });
    } else {
        res.status(401).json({
            body: 'failure'
        });
    }
};

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;
module.exports.signinAttempt = signinAttempt;