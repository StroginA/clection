const db = require('../db/models/index');
const User = db.sequelize.models.User;
const Collection = db.sequelize.models.Collection;
const Item = db.sequelize.models.Item;
const Comment = db.sequelize.models.Comment;
const UserItem = db.sequelize.models.UserItem;

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

const postComment = async (req, res, next) => {
    const author = await User.findOne({
        where: {
            name: req.body.comment.author
        }
    });
    const item = await Item.findByPk(req.body.comment.id);
    const createdComment = await item.createComment(
        {
            body: req.body.comment.body,
            UserId: author.id
        }
    );
    if (createdComment) {
        res.status(201).json({createdComment});
    } else {
        res.status(500).end();
    }
}

const toggleLike = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            name: req.body.user
        }
    });
    const [like, created] = await UserItem.findOrCreate(
        {
            where: {
                UserId: user.id,
                ItemId: req.body.id
            },
            defaults: {
                UserId: user.id,
                ItemId: req.body.id
            }
        }
    );
    if (!created) {
        await like.destroy()
        res.status(200).end()
    } else {
        res.status(201).end()
    }
}

const postItem = async (req, res, next) => {
    const user = await User.findOne({where: {name: req.body.UserName}});
    const collection = await Collection.findByPk(req.body.CollectionId);
    const newItem = await collection.createItem({
        name: req.body.name,
        UserId: user.id
    });
    if (newItem) {
        res.status(201).json(newItem);
    } else {
        res.status(500).end();
    }
}

const deleteItem = async (req, res, next) => {
    const id = req.body.id;
    await Item.destroy(
        {
            where:
            {
                id: id
            }
        }
    )
    res.status(200).end()
}

module.exports.fetchLatestItems = fetchLatestItems;
module.exports.fetchItem = fetchItem;
module.exports.fetchComments = fetchComments;
module.exports.postComment = postComment;
module.exports.toggleLike = toggleLike;
module.exports.postItem = postItem;
module.exports.deleteItem = deleteItem;