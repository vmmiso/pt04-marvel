const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Rating = require("../models/Rating");
const Popularity = require("../models/Popularity");


const characterIsLiked = async (characterId, username) => {
    try {
        const existLike = await Like.exists({
            username: username,
            characterId: characterId
        })

        if (existLike) return true;
        
        return false;
    } catch (err) {
        console.error("Error en función characterIsLiked.");
        throw new Error(err);
    }
}

const getTotalLikesCharacter = async (characterId) => {
    try {
        const likes = await Like.aggregate([
            {
                $match: { characterId: Number(characterId) },
            },
            {  
                $group: { _id: null, totalLikes: {$sum: 1} }
            }
        ]);

        if (likes.length) return likes[0]?.totalLikes;

        return 0;
    } catch (err) {
        console.error("Error en función getTotalLikesCharacter.");
        throw new Error(err);
    }
}

const getCommentsCharacter = async (characterId) => {
    try {
        const comments = await Comment.find({characterId: Number(characterId)});

        return comments;
    } catch (err) {
        console.error("Error en función getCommentsCharacter.");
        throw new Error(err);
    }
}

const getTotalCommentsCharacter = async (characterId) => {
    try {
        const comments = await Comment.aggregate([
            {
                $match: { characterId: Number(characterId) },
            },
            {  
                $group: { _id: null, totalComments: {$sum: 1} }
            }
        ]);

        if (comments.length) return comments[0]?.totalComments;

        return 0;
    } catch (err) {
        console.error("Error en función getTotalCommentsCharacter.");
        throw new Error(err);
    }
}

const getTotalRatingsCharacter = async (characterId) => {
    try {
        const ratings = await Rating.aggregate([
            {
                $match: { characterId: Number(characterId) },
            },
            {  
                $group: { _id: null, totalRatings: {$sum: 1} }
            }
        ]);

        if (ratings.length) return ratings[0]?.totalRatings;

        return 0;
    } catch (err) {
        console.error("Error en función getTotalRatingsCharacter.");
        throw new Error(err);
    }
}

const getAverageRatingCharacter = async (characterId) => {
    try {
        const rating = await Rating.aggregate([
            {
                $match: { characterId: Number(characterId) },
            },
            {  
                $group: { _id: null, totalRatings: {$sum: 1}, rating: { $avg: "$rating" } }
            }
        ]);

        if (rating.length > 0) return rating[0]?.rating;

        return -1;
    } catch (err) {
        console.error("Error en función getAverageRatingCharacter.");
        throw new Error(err);
    }
}

const getRatingByUserCharacter = async (characterId, username) => {
    try {
        const rating = await Rating.find({username, characterId});

        if (rating.length > 0) return rating[0]?.rating;

        return 0;
    } catch (err) {
        console.error("Error en función getAverageRatingCharacter.");
        throw new Error(err);
    }
}

const getPopularityCharacter = async (characterId) => {
    try {
        const popularity = await Popularity.findOne({ characterId: characterId });

        if (!popularity) return 0;

        return popularity.popularity;
    } catch (err) {
        console.error("Error en función getPopularityCharacter.");
        throw new Error(err);
    }
}

const getTopCharacterIds = async () => {
    try {
        const topCharacters = await Popularity.find().sort({popularity: -1}).limit(3);

        return topCharacters;
    } catch (err) {
        console.error("Error en función getTopCharacterIds.");
        throw new Error(err);
    }
}



module.exports = {
    characterIsLiked,
    getTotalLikesCharacter,
    getCommentsCharacter,
    getTotalCommentsCharacter,
    getTotalRatingsCharacter,
    getAverageRatingCharacter,
    getPopularityCharacter,
    getRatingByUserCharacter,
    getTopCharacterIds,
};