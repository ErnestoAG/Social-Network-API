const { user } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await user.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async getSingleUser(req, res) {
    try {
      const users = await user.findOne({ _id: req.params.userId });

      if (!users) {
        return res.status(404).json({ message: 'No user found with that ID' })
      }

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async addFriend(req, res) {
    try {
      const users = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!users) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const users = await user.create(req.body);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const users = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!users) {
        res.status(404).json({ message: 'No user found with that id!' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser(req, res) {
    try {
      const users = await user.deleteOne({ _id: req.params.userId });

      if (!users) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
