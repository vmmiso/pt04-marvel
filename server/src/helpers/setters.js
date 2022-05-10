const Popularity = require("../models/Popularity");
const { getTotalLikesCharacter, getTotalCommentsCharacter, getAverageRatingCharacter } = require("./getters");


const updatePopularityCharacter = async (characterId) => {
    try {
        const [ totalLikes, totalComments, averageRating ] = await Promise.all([
            getTotalLikesCharacter(characterId),
            getTotalCommentsCharacter(characterId),
            getAverageRatingCharacter(characterId),
        ]);

        let popularity = 1 * totalLikes + 2 * totalComments;

        if (averageRating > 7) popularity = popularity * 1.5;
        if (averageRating < 3) popularity = popularity / 1.5;

        const popularityCharacter = await Popularity.findOneAndUpdate(
            { characterId: characterId },
            { $set: { popularity: popularity }},
            { upsert: true, new: true }
        );

        return popularityCharacter;
    } catch (err) {
        console.error("Error en función updatePopularityCharacter.");
        throw new Error(err);
    }
}


module.exports = {
    updatePopularityCharacter,
};