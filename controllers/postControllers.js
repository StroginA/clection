const db = require('../db/models/index');
const Item = db.sequelize.models.Item;
const User = db.sequelize.models.User;

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

module.exports.postComment = postComment;