const express = require('express');
const router = express.Router();

const classCtrl = require('../controllers/class');

router.get("/", classCtrl.getAllClasses);
router.get('/:id', classCtrl.getOneClass);
router.post('/', classCtrl.createClass);
router.put('/:id', classCtrl.modifyClass);
router.delete('/:id',classCtrl.deleteClass);
router.post('/:id', classCtrl.classSignIn);

module.exports = router;