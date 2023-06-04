const express = require('express');
const router = express.Router();

const imageRoutes = require('./image.routes');

router.use('/images', express.static('./uploads'));

router.use('/', imageRoutes);

module.exports = router;