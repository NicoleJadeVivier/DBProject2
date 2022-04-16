const express = require('express');
const controller = require('../controller/spot');
const router = express.Router();

router.get('/', async (req, res, next) => {
    controller.spotProcessor(req, res);
    next();
});


module.exports = router;