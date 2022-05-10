const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        characterId: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Like", LikeSchema);