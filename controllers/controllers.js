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

const fetchLargestCollections = async (req, res, next) => {
    // stub
    const User = db.sequelize.models.User;
    const Collection = db.sequelize.models.Collection;
    const Item = db.sequelize.models.Item;
    const largest = await Collection.findAll({
        attributes: {
            include: [
                [db.sequelize.fn('count', db.sequelize.col('Items.id')), 'itemCount'],
                [db.sequelize.col('User.name'), 'user']
            ]
        },
        include: 
        [{
            model: User,
            attributes: [],
            required: true,
            duplicating: false
        }, 
        {
            model: Item,
            attributes: [],
            required: true,
            duplicating: false
        }],
        limit: 3,
        order: [
            [db.sequelize.fn('count', db.sequelize.col('Items.id')), 'DESC']
        ],
        group: ['Collection.id', 'User.id']
    });
    res.status(200).json({body: largest});
}

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;
module.exports.signinAttempt = signinAttempt;
module.exports.isUsernameAvailable = isUsernameAvailable;
module.exports.fetchLargestCollections = fetchLargestCollections;