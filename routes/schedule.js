const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/schedule');

router.get('/', scheduleController.getSchedule);

router.get('/add-task', scheduleController.addTask);

router.post('/add-task', scheduleController.postTask);

router.post('/update-task', scheduleController.updateTask)

router.get('/select-schedule', scheduleController.viewSchedule);

router.post('/select-schedule', scheduleController.viewSchedule);

router.post('/edit-task', scheduleController.editTask)

router.post('/delete-task', scheduleController.deleteTask);


module.exports = router;
