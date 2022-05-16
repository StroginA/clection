const db = require('../db/models/index');
const Item = db.sequelize.models.Item;
const User = db.sequelize.models.User;
const UserItem = db.sequelize.models.UserItem;

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

module.exports.postComment = postComment;
module.exports.toggleLike = toggleLike;