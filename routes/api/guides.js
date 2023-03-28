const express = require('express');
const router = express.Router();
const guideCtrl = require('../../controllers/api/guide')

router.post('/:classId', guideCtrl.createGuide)
router.get('/:classId', guideCtrl.getGuidesForClass)
router.get('/guide/:guideId', guideCtrl.getGuide)

module.exports = router;