const marvelAPI = require("../services/marvel");
const { characterIsLiked, getCommentsCharacter, getAverageRatingCharacter, getRatingByUserCharacter, getTotalRatingsCharacter, getTopCharacterIds } = require("../helpers/getters");


// Fetches lists of characters.
const getCharacters = async (req, res) => {
    try {
        // TODO query verification
        const characters = await marvelAPI.getCharacters(req.query);

        return res.status(200).json(characters);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

// Get list of X top characters.
const getTopCharacters = async (req, res) => {
    try {
        // TODO query verification
        const topCharactersIds = await getTopCharacterIds();
        let topCharacters = [];

        // TODO Promise.all
        for (let index = 0; index < topCharactersIds.length; index++) {
            const character = await marvelAPI.getCharacterById(topCharactersIds[index].characterId);
            topCharacters.push(character?.data?.results[0]);
        }

        return res.status(200).json(topCharacters);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

const getCharacterById = async (req, res) => {
    try {
        // TODO query verification
        const character = await marvelAPI.getCharacterById(req.params.characterId);

        return res.status(200).json(character);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

const getCharacterExtraById = async (req, res) => {
    try {
        const [ rating, averageRating, totalRatings, isLiked, comments ] = await Promise.all([
            getRatingByUserCharacter(req.params.characterId, req.params.username),
            getAverageRatingCharacter(req.params.characterId),
            getTotalRatingsCharacter(req.params.characterId),
            characterIsLiked(req.params.characterId, req.params.username),
            getCommentsCharacter(req.params.characterId)
        ]);

        return res.status(200).json({rating, averageRating, totalRatings, isLiked, comments});
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}


module.exports = {
    getCharacters,
    getTopCharacters,
    getCharacterById,
    getCharacterExtraById,
};