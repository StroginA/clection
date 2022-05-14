const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/connection-check', controllers.connectionCheck);
router.get('/db-connection-check', controllers.dbConnectionCheck);
router.post('/signin-attempt', controllers.signinAttempt);
router.get('/is-username-available', controllers.isUsernameAvailable);
router.get('/fetch-latest-items', controllers.fetchLatestItems);
router.get('/fetch-largest-collections', controllers.fetchLargestCollections);
router.get('/fetch-user-profile', controllers.fetchUserProfile);
router.post('/signup-attempt', controllers.signupAttempt);
router.get('/verify-session', controllers.verifySession);
router.delete('/delete-user', controllers.deleteUser);
router.put('/block-user', controllers.blockUser);
router.put('/unblock-user', controllers.unblockUser);
router.put('/make-admin', controllers.makeAdmin);
router.put('/strip-admin', controllers.stripAdmin);
router.get('/fetch-user-collections', controllers.fetchUserCollections);

module.exports = router;