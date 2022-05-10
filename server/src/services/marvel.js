const CryptoJS = require("crypto-js");
const axios = require('axios').default;


const date = Number(new Date());

const BASE_URL = `https://gateway.marvel.com:443/v1/public/`;

const baseParams = {
    apikey: process.env.MARVEL_PUBLIC_KEY,
    ts: date.toString(),
    hash: CryptoJS.MD5(date.toString() + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY).toString()
};

const getCharacters = async (options) => {
    try {
        const resp = await axios.get(`${BASE_URL}characters`, { params: { ...baseParams, ...options } });
        if (resp.status === 200) {
            return resp.data;
        } else {
            console.error("Error en función getCharacters. Response != 200.");
            throw new Error();
        };
    } catch (err) {
        console.error("Error en función getCharacters.");
        throw new Error(err);
    }
}

const getCharacterById = async (characterId) => {
    try {
        const resp = await axios.get(`${BASE_URL}characters/${characterId}`, { params: { ...baseParams } });
        if (resp.status === 200) {
            return resp.data;
        } else {
            console.error("Error en función getCharacterById. Response != 200.");
            throw new Error();
        };
    } catch (err) {
        console.error("Error en función getCharacterById.");
        throw new Error(err);
    }
}


module.exports = {
    getCharacters,
    getCharacterById,
}