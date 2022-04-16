const express = require('express');
const controller = require('../controllers/parking_assignment');
const router = express.Router();

router.post('/', async (req, res, next) => {
    controller.postController(req, res);
    next();
});

router.put('/:assignment_id', async (req, res, next) => {
    controller.putController(req, res);
    next();
});

router.delete('/:assignment_id', async(req, res, next) => {
    controller.deleteController(req, res);
    next();
});

module.exports = router;