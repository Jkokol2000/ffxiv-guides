const express = require('express');
const router = express.Router();
const guideCtrl = require('../../controllers/api/guide')
const auth = require('../../config/ensureLoggedIn')

router.post('/:classId', guideCtrl.createGuide)
router.get('/:classId', guideCtrl.getGuidesForClass)
router.get('/guide/:guideId', guideCtrl.getGuide)
router.post('/:guideId/comments', guideCtrl.createComment)
router.get('/:guideId/comments', guideCtrl.getComments)
router.get('/account/:userId', guideCtrl.getGuidesForUser)
router.delete('/:guideId', auth, guideCtrl.deleteGuide)
router.put('/:guideId', auth, guideCtrl.updateGuide)

module.exports = router;