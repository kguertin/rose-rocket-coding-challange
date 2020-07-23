const express = require('express');
const router = express.Router();

const scheudleController = require('../controllers/schedule');

router.get('/', scheudleController.getSchedule);

router.get('/add-task', scheudleController.addTask);

router.post('/add-task', scheudleController.postTask);

router.post('/select-schedule', scheudleController.viewSchedule);

module.exports = router;
