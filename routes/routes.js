const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/connection-check', controllers.connectionCheck);
router.get('/db-connection-check', controllers.dbConnectionCheck);
router.post('/signin-attempt', controllers.signinAttempt);
router.put('/is-username-available', controllers.isUsernameAvailable);
router.get('/fetch-largest-collections', controllers.fetchLargestCollections);

module.exports = router;