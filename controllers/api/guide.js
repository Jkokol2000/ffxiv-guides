const Guide = require('../../models/guide')

async function getGuidesForClass(req, res) {
  try {
    const guides = await Guide.find({ class: req.params.classId});
    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getGuide(req, res) {
    try {
        const guideSearch = await Guide.findById(req.params.guideId)
        console.log(guideSearch)
        res.json(guideSearch)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

async function createGuide(req, res) {
  try {
    const guide = new Guide({
      user: req.user._id,
      class: req.body.class,
      title: req.body.title,
      content: req.body.content,
      ranking: 0,
      comments: []
    });
    await guide.save();
    res.status(201).json(guide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getGuidesForClass,
  createGuide,
  getGuide
};
