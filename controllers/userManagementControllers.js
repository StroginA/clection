const db = require('../db/models/index');
const User = db.sequelize.models.User;

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

module.exports.signupAttempt = signupAttempt;
module.exports.isUsernameAvailable = isUsernameAvailable;
module.exports.deleteUser = deleteUser;
module.exports.blockUser = blockUser;
module.exports.unblockUser = unblockUser;
module.exports.makeAdmin = makeAdmin;
module.exports.stripAdmin = stripAdmin;