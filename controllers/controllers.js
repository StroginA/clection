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

const signinAttempt = async (req, res, next) => {
    // stub
    // implement hashing+salting later !!!
    const auth = req.body.auth;
    const User = db.sequelize.models.User;
    const queriedUser = await User.findOne(
        {
            attributes: ['password'],
            where: {
                name: auth.username,
                isBlocked: false
            }
        }
    );
    if (!queriedUser || (queriedUser.password != auth.password)) {
        res.status(401).json({
            message: 'Invalid combination of username and password.'
        });
    } else {
        const { signJwt } = require('./jwtController');
        signJwt(auth.username,
            (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Error while generating session token.'
                    });
                } else {
                    console.log(token);
                    res.status(200).json({
                        user: req.body.auth.username,
                        token: token
                    });
                }
            }
        );
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

const fetchUserProfile = async (req, res, next) => {
    const User = db.sequelize.models.User;
    console.log(req.params)
    queriedUser = await User.findOne(
        {
            attributes: ['name'],
            where: {
                name: req.params.name
            }
        }
    );
    if (!queriedUser) {
        res.status(404).end()
    } else {
        res.status(200).json({
            name: queriedUser.name
        })
    }
}

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;
module.exports.signinAttempt = signinAttempt;
module.exports.isUsernameAvailable = isUsernameAvailable;
module.exports.fetchLargestCollections = fetchLargestCollections;
module.exports.fetchUserProfile = fetchUserProfile;