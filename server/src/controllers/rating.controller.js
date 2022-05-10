const Rating = require("../models/Rating");
const { getAverageRatingCharacter } = require("../helpers/getters");
const { updatePopularityCharacter } = require("../helpers/setters");


// Add rating to character
const addRating = async (req, res) => {
    try {
        // TODO body verification

        await Rating.deleteMany({
            username: req.body.username,
            characterId: req.body.characterId,
        });

        const newRating = new Rating({
            username: req.body.username,
            characterId: req.body.characterId,
            rating: req.body.rating,
        });

        const savedRating = await newRating.save();

        await updatePopularityCharacter(req.body.characterId);

        return res.status(201).json(savedRating);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Get rating by id
const getRatingById = async (req, res) => {
    try {
        // TODO verification
        const rating = await Rating.findById(req.params.ratingId);

        return res.status(200).json(rating);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Get rating by username and character id
const getRatingByUserCharacter = async (req, res) => {
    try {
        // TODO verification
        const rating = await Rating.find({username: req.params.username, characterId: req.params.characterId});

        if (rating.length > 0)
            return res.status(200).json(rating);
        else
            return res.status(404).json('Rating not found');
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const averageRatingCharacter = async (req, res) => {
    try {
        // TODO verification
        const characterId = Number(req.params.characterId);

        console.log(await getAverageRatingCharacter(characterId))

        const rating = await Rating.aggregate([
            {
                $match: { characterId: characterId },
            },
            {  
                $group: { _id: null, totalRatings: {$sum: 1}, rating: { $avg: "$rating" } }
            }
        ]);

        if (rating.length > 0)
        {
            const { _id, ...others } = rating[0];
            return res.status(200).json({ characterId, ...others });
        }

        else
            return res.status(404).json('No ratings found');
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    addRating,
    getRatingById,
    getRatingByUserCharacter,
    averageRatingCharacter,
};