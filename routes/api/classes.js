const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/api/class')

router.post('/', classCtrl.addClass)
router.get('/', classCtrl.getClasses)
router.get('/:id', classCtrl.getClass);

module.exports = router;