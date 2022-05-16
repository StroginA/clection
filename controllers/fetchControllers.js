const db = require('../db/models/index');
const UserItem = require('../db/models/userItem');
const User = db.sequelize.models.User;
const Collection = db.sequelize.models.Collection;
const Item = db.sequelize.models.Item;
const Comment = db.sequelize.models.Comment;

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
                [db.sequelize.fn('count', db.sequelize.col('Comments.id')), 'commentCount'],
                [db.Sequelize.literal('COUNT("UserItems->UserItem"."UserId") OVER (PARTITION BY "Item"."id")'), 'likeCount']
            ]
        },
        include: 
        [{
            model: User,
            as: "User",
            attributes: []
        }, 
        {
            model: Collection,
            attributes: [],
            required: true,
            duplicating: false
        },
        {
            model: Comment,
            attributes: [],
            duplicating: false
        },
        {
            model: User,
            as: "UserItems",
            through: {
                attributes: []
            },
            attributes: [],
            duplicating: false
        }
        ],
        limit: 3,
        order: [
            ['createdAt', 'DESC']
        ],
        group: ['Item.id', 'User.name', 'Collection.name', 'Collection.category', "UserItems->UserItem.UserId"]
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

const fetchCollection = async (req, res, next) => {
    const collection = await Collection.findByPk(
        req.query.id,
        {
            attributes: {
                include: [
                    [db.sequelize.col('User.name'), 'user']
                ]
            },
            include: [{
                model: Item,
                duplicating: false
            }, 
            {
                model: User,
                attributes: []
            }]
        }
    )
    if (!collection) {
        res.status(404).end()
    } else {
        res.status(200).json({
            ...collection.dataValues
        })
    }
}

const fetchItem = async (req, res, next) => {
    const item = await Item.findByPk(
        req.query.id,
        {
            attributes: {
                include: [
                    [db.sequelize.col('User.name'), 'user'],
                    [db.sequelize.col('Collection.name'), 'collection'],
                    [db.sequelize.col('Collection.category'), 'category'],
                    [db.Sequelize.literal('COUNT("UserItems->UserItem"."UserId") OVER (PARTITION BY "Item"."id")'), 'likeCount']
                ]
            },
            include: [{
                model: User,
                as: "User",
                attributes: []
            },
            {
                model: Collection,
                attributes: []
            },
            {
                model: User,
                as: "UserItems",
                through: {
                    attributes: []
                },
                attributes: [],
                duplicating: false
            }
            ]
        }
    )
    if (!item) {
        res.status(404).end()
    } else {
        res.status(200).json({
            ...item.dataValues
        })
    }
}

const fetchComments = async (req, res, next) => {
    const item = await Item.findByPk(
        req.query.id
    );
    const comments = await item.getComments({
        attributes: {
            include: [
                [db.sequelize.col('User.name'), 'author']
            ]
        },
        include: [{
            model: User,
            attributes: []
        }]
    })
    if (!comments) {
        res.status(404).end()
    } else {
        res.status(200).json({
            body: comments
        })
    }
}

module.exports.fetchLatestItems = fetchLatestItems;
module.exports.fetchLargestCollections = fetchLargestCollections;
module.exports.fetchUserProfile = fetchUserProfile;
module.exports.fetchUserCollections = fetchUserCollections;
module.exports.fetchCollection = fetchCollection;
module.exports.fetchItem = fetchItem;
module.exports.fetchComments = fetchComments;