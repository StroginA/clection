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


const fetchUserCollections = async (req, res, next) => {
    const user = await User.findOne({
        attributes: {
            include: ['name']
        },
        where:{
            name: req.query.UserName
        }
    });
    if (user) {
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
        res.status(200).json({ body: userCollections });
    } else {
        res.status(404).end()
    }
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

const postCollection = async (req, res, next) => {
    const user = await User.findByPk(req.body.UserId);
    const newCollection = await user.createCollection(req.body.collection);
    if (newCollection) {
        res.status(201).json(newCollection);
    } else {
        res.status(500).end();
    }
}


const deleteCollection = async (req, res, next) => {
    const id = req.body.id;
    await Collection.destroy(
        {
            where:
            {
                id: id
            }
        }
    )
    res.status(200).end()
}


module.exports.fetchLargestCollections = fetchLargestCollections;
module.exports.deleteCollection = deleteCollection;
module.exports.fetchUserCollections = fetchUserCollections;
module.exports.fetchCollection = fetchCollection;
module.exports.postCollection = postCollection;