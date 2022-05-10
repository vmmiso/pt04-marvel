const Like = require("../models/Like");
const { updatePopularityCharacter } = require("../helpers/setters");


// Add like / Unlike to character
const addLike = async (req, res) => {
    try {
        // TODO body verification

        const deletedLike = await Like.deleteMany({
            username: req.body.username,
            characterId: req.body.characterId,
        })

        if (deletedLike.deletedCount === 0) { 
            // LIKE
            const newLike = new Like({
                username: req.body.username,
                characterId: req.body.characterId,
            });
    
            const savedLike = await newLike.save();

            await updatePopularityCharacter(req.body.characterId);
    
            return res.status(200).json({ ...savedLike._doc, like: true });
        }
        else {
            // UNLIKE
            await updatePopularityCharacter(req.body.characterId);

            return res.status(200).json({like: false});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Get like by id
const getLikeById = async (req, res) => {
    try {
        // TODO verification
        const like = await Like.findById(req.params.likeId);

        return res.status(200).json(like);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    addLike,
    getLikeById,
};