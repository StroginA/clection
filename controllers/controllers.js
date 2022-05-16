const db = require('../db/models/index');
const User = db.sequelize.models.User;
const Collection = db.sequelize.models.Collection;
const Item = db.sequelize.models.Item;

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

const signupAttempt = async (req, res, next) => {
    const auth = req.body.auth;
    const queriedUser = await User.findOne(
        {
            attributes: ['name'],
            where: {
                name: auth.username
            }
        }
    );
    if (!queriedUser) {
        hashedPassword = auth.password
        // hash password!
        await User.create({
            name: auth.username,
            password: hashedPassword
        })
        res.status(201).json({message: 'Signup successful.'});
    } else {
        res.status(409).json({message: 'This username is taken.'});
    };
}

const signinAttempt = async (req, res, next) => {
    // stub
    // implement hashing+salting later !!!
    const auth = req.body.auth;
    const queriedUser = await User.findOne(
        {
            attributes: ['password', 'isAdmin'],
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
        const { signJwt } = require('./jwtManager');
        signJwt(auth.username,
            (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Error while generating session token.'
                    });
                } else {
                    res.status(200).json({
                        user: req.body.auth.username,
                        token: token,
                        isAdmin: queriedUser.isAdmin
                    });
                }
            }
        );
    }
};

const isUsernameAvailable = async (req, res, next) => {
    // stub
    // make it generate salt to be used for password
    const queriedUser = await User.findOne(
        {
            attributes: ['name'],
            where: {
                name: req.query.username
            }
        }
    );
    if (!queriedUser) {
        res.status(200).json({message: 'This username is available.'});
    } else {
        res.status(409).json({message: 'This username is taken.'});
    };
}

const fetchLargestCollections = async (req, res, next) => {
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

const fetchLatestItems = async (req, res, next) => {
    const latest = await Item.findAll({
        attributes: {
            include: [
                [db.sequelize.col('User.name'), 'user'],
                [db.sequelize.col('CollectionId'), 'collectionId'],
                [db.sequelize.col('Collection.name'), 'collectionName'],
                [db.sequelize.col('Collection.category'), 'category'],
            ]
        },
        include: 
        [{
            association: 'User',
            attributes: [],
            required: true,
            duplicating: false
        }, 
        {
            model: Collection,
            attributes: [],
            required: true,
            duplicating: false
        }],
        limit: 3,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    res.status(200).json({body: latest});
}

const fetchUserProfile = async (req, res, next) => {
    const queriedUser = await User.findOne(
        {
            attributes: ['name', 'isBlocked', 'isAdmin', 'id'],
            where: {
                name: req.query.name
            }
        }
    );
    if (!queriedUser) {
        res.status(404).end()
    } else {
        res.status(200).json({
            ...queriedUser.dataValues
        })
    }
}

const fetchUserCollections = async (req, res, next) => {
    const user = await User.findOne({
        attributes: {
            include: ['name']
        },
        where:{
            name: req.query.UserName
        }
    });
    const userCollections = await user.getCollections({
        attributes: {
            include: [
                [db.sequelize.fn('count', db.sequelize.col('Items.id')), 'itemCount'],
                [db.sequelize.col('User.name'), 'user']
            ]
        },
        include: 
        [{
            model: Item,
            attributes: [],
            required: true,
            duplicating: false
        },
        {
            model: User,
            attributes: []
        }
        ],
        order: [
            [db.sequelize.fn('count', db.sequelize.col('Items.id')), 'DESC']
        ],
        group: ['Collection.id', 'User.name']
    });
    res.status(200).json({body: userCollections});
}

const verifySession = async (req, res, next) => {
    /*
    Verify received token.
    If successful, fetch current blocked/admin status from DB
    Respond with {user, token: newToken, isAdmin}
    If unsuccessful/user deleted/blocked, respond with 401
    */
    const token = req.query.token
    const { verifyJwt } = require('./jwtManager');
    verifyJwt(token,
        async (err, payload) => {
            if (payload) {
                const queriedUser = await User.findOne(
                    {
                        attributes: ['name', 'isBlocked', 'isAdmin'],
                        where: {
                            name: payload.username
                        }
                    }
                );
                if (!queriedUser || queriedUser.isBlocked) {
                    res.status(401).end()
                } else {
                    const { signJwt } = require('./jwtManager');
                    signJwt(payload.username,
                        (err, token) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({
                                    message: 'Error while generating session token.'
                                });
                            } else {
                                res.status(200).json({
                                    user: payload.username,
                                    token: token,
                                    isAdmin: queriedUser.isAdmin
                                });
                            }
                        }
                    );
                }
            } else {
                res.status(401).end()
            }
        }
    )
}

const deleteUser = async (req, res, next) => {
    const name = req.body.name;
    await User.destroy(
        {
            where:
            {
                name: name
            }
        }
    )
    res.status(200).end()
}

const blockUser = async (req, res, next) => {
    const name = req.body.name;
    await User.update(
        { isBlocked: true },
        {
            where:
            {
                name: name
            }
        }
    )
    res.status(200).end()
}

const unblockUser = async (req, res, next) => {
    const name = req.body.name;
    await User.update(
        { isBlocked: false },
        {
            where:
            {
                name: name
            }
        }
    )
    res.status(200).end()
}

const makeAdmin = async (req, res, next) => {
    const name = req.body.name;
    await User.update(
        { isAdmin: true },
        {
            where:
            {
                name: name
            }
        }
    )
    res.status(200).end()
}

const stripAdmin = async (req, res, next) => {
    const name = req.body.name;
    await User.update(
        { isAdmin: false },
        {
            where:
            {
                name: name
            }
        }
    )
    res.status(200).end()
}

module.exports.connectionCheck = connectionCheck;
module.exports.dbConnectionCheck = dbConnectionCheck;
module.exports.signinAttempt = signinAttempt;
module.exports.isUsernameAvailable = isUsernameAvailable;
module.exports.fetchLatestItems = fetchLatestItems;
module.exports.fetchLargestCollections = fetchLargestCollections;
module.exports.fetchUserProfile = fetchUserProfile;
module.exports.signupAttempt = signupAttempt;
module.exports.verifySession = verifySession;
module.exports.deleteUser = deleteUser;
module.exports.blockUser = blockUser;
module.exports.unblockUser = unblockUser;
module.exports.makeAdmin = makeAdmin;
module.exports.stripAdmin = stripAdmin;
module.exports.fetchUserCollections = fetchUserCollections;