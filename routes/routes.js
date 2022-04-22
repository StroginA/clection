const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/connection-check', controllers.connectionCheck);
router.get('/db-connection-check', controllers.dbConnectionCheck);

module.exports = router;