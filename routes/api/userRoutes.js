const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/').post(createUser);

router.route('/:userId').put(updateUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

module.exports = router;
