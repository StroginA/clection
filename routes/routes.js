const express = require('express');
const router = express.Router();
const general = require('../controllers/generalControllers');
const session = require('../controllers/sessionControllers');
const user = require('../controllers/userManagementControllers');
const collection = require('../controllers/collectionControllers')
const item = require('../controllers/itemControllers')

router.get('/connection-check', general.connectionCheck);
router.get('/db-connection-check', general.dbConnectionCheck);
router.post('/signin-attempt', session.signinAttempt);
router.get('/verify-session', session.verifySession);
router.get('/fetch-user-profile', user.fetchUserProfile);
router.post('/signup-attempt', user.signupAttempt);
router.get('/is-username-available', user.isUsernameAvailable);
router.delete('/delete-user', user.deleteUser);
router.put('/block-user', user.blockUser);
router.put('/unblock-user', user.unblockUser);
router.put('/make-admin', user.makeAdmin);
router.put('/strip-admin', user.stripAdmin);
router.get('/fetch-latest-items', item.fetchLatestItems);
router.get('/fetch-largest-collections', collection.fetchLargestCollections);
router.get('/fetch-user-collections', collection.fetchUserCollections);
router.get('/fetch-collection', collection.fetchCollection);
router.post('/post-collection', collection.postCollection);
router.delete('/delete-collection', collection.deleteCollection)
router.get('/fetch-item', item.fetchItem);
router.get('/fetch-comments', item.fetchComments);
router.post('/post-comment', item.postComment);
router.post('/toggle-like', item.toggleLike);
router.post('/post-item', item.postItem);
router.delete('/delete-item', item.deleteItem);

module.exports = router;