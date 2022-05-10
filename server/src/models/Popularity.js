const mongoose = require("mongoose");

const PopularitySchema = new mongoose.Schema(
    {
        characterId: { type: Number, required: true },
        popularity: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Popularity", PopularitySchema);