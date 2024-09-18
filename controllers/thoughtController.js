const { user, thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughts = await thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thoughts = await thought.create(req.body);
      const users = await user.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { runValidators: true, new: true });
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughts = await thought.findOneAndDelete({ _id: req.params.thoughtId });
      
      if (!thoughts) {
        res.status(404).json({ message: 'No thought with that id!' });
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughts = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        res.status(404).json({ message: 'No thought with that id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thoughts = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
