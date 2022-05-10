const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        characterId: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Comment", CommentSchema);