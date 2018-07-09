'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/task-controller');


router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteByid);

module.exports = router;