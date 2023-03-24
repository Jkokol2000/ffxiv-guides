const express = require('express');
const router = express.Router();
const auth = require('../../config/ensureLoggedIn')
const classCtrl = require('../../controllers/api/class')

router.post('/', classCtrl.addClass)
router.get('/', classCtrl.getClasses)

module.exports = router;