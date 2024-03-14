const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    addReaction,
    deleteReaction,
    // deleteUser,
  } = require('../../controller/thoughtController');
  
  // /api/users
  router.route('/')
  .get(getThoughts)
  .post(createThought);
  
  
  
  
//   // /api/users/:userId
  router.route('/:thoughtId')
  .get(getSingleThought)
//   .delete(deleteUser)
  

router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)




  module.exports = router;