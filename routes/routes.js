const express = require('express');
const router = express.Router();
const fetch = require('../controllers/fetchControllers');
const general = require('../controllers/generalControllers');
const session = require('../controllers/sessionControllers');
const user = require('../controllers/userManagementControllers');

router.get('/connection-check', general.connectionCheck);
router.get('/db-connection-check', general.dbConnectionCheck);
router.post('/signin-attempt', session.signinAttempt);
router.get('/verify-session', session.verifySession);
router.post('/signup-attempt', user.signupAttempt);
router.get('/is-username-available', user.isUsernameAvailable);
router.delete('/delete-user', user.deleteUser);
router.put('/block-user', user.blockUser);
router.put('/unblock-user', user.unblockUser);
router.put('/make-admin', user.makeAdmin);
router.put('/strip-admin', user.stripAdmin);
router.get('/fetch-latest-items', fetch.fetchLatestItems);
router.get('/fetch-largest-collections', fetch.fetchLargestCollections);
router.get('/fetch-user-profile', fetch.fetchUserProfile);
router.get('/fetch-user-collections', fetch.fetchUserCollections);

module.exports = router;