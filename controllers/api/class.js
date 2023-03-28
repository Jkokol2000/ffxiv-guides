const Class = require('../../models/class')

module.exports = {
    getClasses,
    addClass,
    getClass
}

async function getClasses(req, res) {
    try {
      // Retrieve all classes from the database
      const classes = await Class.find();
  
      // If there are no classes, return an error response
      if (!classes) {
        return res.status(404).json({ error: 'No classes found' });
      }
  
      // Return the classes as a JSON response
      return res.status(200).json(classes);
  
    } catch (err) {
      // If there is an error, return a server error response
      return res.status(500).json({ error: 'Server error' });
    }
  }

async function addClass(req, res) {
    try {
        const newClass = new Class({
            name: req.body.name,
            description: req.body.description,
            icon: req.body.name,
            classType: req.body.classType
        });

        const savedClass = await newClass.save();

        res.status(201).json(savedClass);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error'})
    }
}

async function getClass (req, res) {
    try {
      const classId = await Class.findById(req.params.id);
      console.log(classId)
      res.json(classId);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  