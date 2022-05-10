const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        characterId: { type: Number, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Rating", RatingSchema);