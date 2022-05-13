jwt = require('jsonwebtoken');

const signJwt = (user, callback) => {
    // in the callback, send token or error in the response
    jwt.sign(
        {
            username: user
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '15m'
        },
        callback
    );
}

const verifyJwt = (token, callback) => {
    // in the callback, also verify that the user still exists and is not blocked
    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        callback
    );
}

module.exports.signJwt = signJwt;
module.exports.verifyJwt = verifyJwt;