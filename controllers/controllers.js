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
    // implement hashing+salting later !!!
    const mockUsers = require('../mocks/mockUsers.json');
    const auth = req.body.auth;
    let user = "";
    for (i in mockUsers) {
        if (mockUsers[i].username === auth.username
            &&
            mockUsers[i].password === auth.password) {
                user = auth.username;
            }
    }
    if (user) {
        res.status(200).json({
            message: `Successfully signed in as ${req.body.auth.username}.`
        });
    } else {
        res.status(401).json({
            message: 'Invalid combination of username and password.'
        });
    }
};

const isUsernameAvailable = (req, res, next) => {
    // stub
    const mockUsers = require('../mocks/mockUsers.json');
    let taken = false;
    for (i in mockUsers) {
        if (mockUsers[i].username === req.body.username) taken = true;
    }
    if (!taken) {
        res.status(200).json({message: 'This username is available.'});
    } else {
        res.status(409).json({message: 'This username is taken.'});
    };
}

const fetchLargestCollections = (req, res, next) => {
    // stub
    const mockUsers = require('../mocks/mockUsers.json');
    const mockCollections = require('../mocks/mockCollections.json');
    const mockItems = require('../mocks/mockItems.json');
    const largest = mockCollections;
    res.status(200).json({body: largest});
}

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;
module.exports.signinAttempt = signinAttempt;
module.exports.isUsernameAvailable = isUsernameAvailable;
module.exports.fetchLargestCollections = fetchLargestCollections;