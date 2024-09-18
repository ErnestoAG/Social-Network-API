const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

router.route('/:thoughtId').put(updateThought);

router.route('/').post(createThought);

router.route('/:thoughtId/reactions').post(addReaction);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
