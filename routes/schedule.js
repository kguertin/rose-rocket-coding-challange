const express = require('express');
const router = express.Router();

const scheudleController = require('../controllers/schedule');

router.get('/', scheudleController.getSchedule);

router.post('/add-task', scheudleController.addTask);

module.exports = router;
