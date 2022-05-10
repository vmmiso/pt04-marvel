const Comment = require("../models/Comment");
const { updatePopularityCharacter } = require("../helpers/setters");


// Add comment to character
const addComment = async (req, res) => {
    try {
        // TODO body verification

        const newComment = new Comment({
            username: req.body.username,
            characterId: req.body.characterId,
            comment: req.body.comment,
        });

        const savedComment = await newComment.save();
        
        await updatePopularityCharacter(req.body.characterId);

        return res.status(201).json(savedComment);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Get comment by id
const getCommentById = async (req, res) => {
    try {
        // TODO verification
        const comment = await Comment.findById(req.params.commentId);

        return res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Get comments by character
const getCommentsByCharacter = async (req, res) => {
    try {
        // TODO verification
        const comments = await Comment.find({characterId: req.params.characterId});

        if (comments.length > 0)
            return res.status(200).json(comments);
        else
            return res.status(404).json('Comments not found for this character id');
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    addComment,
    getCommentById,
    getCommentsByCharacter,
};