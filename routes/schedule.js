const express = require('express');
const router = express.Router();

const scheudleControler = require('../controllers/schedule');

router.get('/', scheudleControler.getSchedule);

module.exports = router;
