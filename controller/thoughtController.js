const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thoughts with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createThought(req, res) {
      try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
         
    
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
    
        res.json({message: `${thought.thoughtText} has been deleted!`});
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //    reactions api
    async addReaction(req, res) {
      console.log(req.body);
        try {
          const dbReactionData = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            {$addToSet: { reactions: req.body}}, 
            { runValidators: true, new: true }
          );
          res.json(dbReactionData);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async deleteReaction(req, res) {
        try {
          const dbReactionData = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            {$pull: { reactions: { reactionId: req.params.reactionId}}}, 
            { runValidators: true, new: true}
          );
          res.json(dbReactionData);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
  };

 