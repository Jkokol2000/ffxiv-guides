const express = require('express');
const router = express.Router();
const guideCtrl = require('../../controllers/api/guide')
const auth = require('../../config/ensureLoggedIn')

router.post('/:classId', guideCtrl.createGuide)
router.get('/:classId', guideCtrl.getGuidesForClass)
router.get('/guide/:guideId', guideCtrl.getGuide)
router.post('comments/:guideId', guideCtrl.createComment)
router.get('/account/:userId', guideCtrl.getGuidesForUser)
router.delete('/:guideId', auth, guideCtrl.deleteGuide)

module.exports = router;