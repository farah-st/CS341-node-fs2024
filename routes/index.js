const express = require('express');
const router = express.Router();

// Mount the contacts routes under the /contacts endpoint
router.use('/contacts', require('./contacts'));

module.exports = router;
