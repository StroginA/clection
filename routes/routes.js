const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/connection-check', controllers.connectionCheck);
router.get('/db-connection-check', controllers.dbConnectionCheck);
router.post('/signin-attempt', controllers.signinAttempt);
router.get('/is-username-available', controllers.isUsernameAvailable);
router.get('/fetch-largest-collections', controllers.fetchLargestCollections);
router.get('/fetch-user-profile', controllers.fetchUserProfile);
router.post('/signup-attempt', controllers.signupAttempt);
router.get('/verify-session', controllers.verifySession);

module.exports = router;