const db = require('../db/models/index');
const { verifyPassword } = require('./verifyPassword');
const User = db.sequelize.models.User;

const signinAttempt = async (req, res, next) => {
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
    const isCorrect = verifyPassword(auth.password, queriedUser.password);
    if (!queriedUser || (!isCorrect)) {
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

module.exports.signinAttempt = signinAttempt;
module.exports.verifySession = verifySession;