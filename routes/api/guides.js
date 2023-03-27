const express = require('express');
const router = express.Router();
const guideCtrl = require('../../controllers/api/guide')

router.post('/', guideCtrl.createGuide)
router.get('/', classCtrl.getGuides)

module.exports = router;