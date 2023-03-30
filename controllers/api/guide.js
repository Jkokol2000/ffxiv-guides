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

async function updateGuide(req, res) {
  try {
    const guide = await Guide.findById(req.params.guideId);
    if (!guide) return res.status(404).json({ msg: 'Guide not found' });
    const { title, content } = req.body;
    if (title) guide.title = title;
    if (content) guide.content = content;
    await guide.save();
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
}

async function getGuide(req, res) {
    console.log('a')
    try {
      console.log('getGuide function called')
      const guideId = await Guide.findById(req.params.guideId);
      console.log(`${guideId}`)
      res.json(guideId);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
  

async function createGuide(req, res) {
  try {
    const guide = new Guide({
      user: req.body.user,
      author: req.body.author,
      class: req.body.class,
      title: req.body.title,
      content: req.body.content,
      ranking: [],
      comments: []
    });
    await guide.save();
    res.status(201).json(guide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createComment(req, res) {
  try {
    const guide = await Guide.findById(req.params.guideId);
    if (!guide) return res.status(404).json({ msg: 'Guide not found' });
    const { content } = req.body;
    const comment = { content };
    guide.comments.push(comment);
    await guide.save();
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
}


async function getComments(req, res) {
  try {
    const guide = await Guide.findById(req.params.guideId);
    if (!guide) return res.status(404).json({ msg: 'Guide not found' });
    res.json(guide.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
}

async function getGuidesForUser(req, res) {
  try {
    const guides = await Guide.find({ user: req.params.userId});
    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteGuide(req, res) { 
  try {
    const guide = await Guide.findById(req.params.guideId);
    if (!guide) return res.status(404).json({ msg: 'Guide not found' });
    await Guide.findByIdAndRemove(req.params.guideId);
    res.json({ msg: 'Guide removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
}

async function AddRanking(req, res) {
  try {
    const guide = await Guide.findById(req.params.guideId);
    if (!guide) return res.status(404).json({ msg: 'Guide not found' });
    const { ranking } = req.body;
    if (ranking) guide.ranking.push(ranking);
    await guide.save();
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
}


module.exports = {
  getGuidesForClass,
  createGuide,
  getGuide,
  createComment,
  getGuidesForUser,
  deleteGuide,
  updateGuide,
  AddRanking,
  getComments
};
