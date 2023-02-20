const express = require('express');
const router = express.Router();

const volunteerCtrl = require('../controllers/volunteer');

router.post('/signup', volunteerCtrl.signup);
router.post('/login', volunteerCtrl.login);

module.exports = router;