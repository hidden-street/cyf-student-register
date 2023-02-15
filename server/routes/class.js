const express = require('express');
const router = express.Router();

const classCtrl = require('../controllers/class');

router.post('/attendclass', classCtrl.classSignIn);


module.exports = router;