const db = require('../db/models/index');
const User = db.sequelize.models.User;
const Collection = db.sequelize.models.Collection;
const Item = db.sequelize.models.Item;

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

module.exports.fetchLatestItems = fetchLatestItems;
module.exports.fetchLargestCollections = fetchLargestCollections;
module.exports.fetchUserProfile = fetchUserProfile;
module.exports.fetchUserCollections = fetchUserCollections;