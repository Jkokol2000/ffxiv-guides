const Guide = require('../models/guide');

async function getGuidesForClass(req, res) {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
  getGuides,
  createGuide
};
