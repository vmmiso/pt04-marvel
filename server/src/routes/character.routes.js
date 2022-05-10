const router = require("express").Router();

const characterCtrl = require('../controllers/character.controller.js');


//GET CHACARTERS
router.get("/find", characterCtrl.getCharacters);

//GET CHACARTERS
router.get("/find/top", characterCtrl.getTopCharacters);

//GET CHACARTER BY ID
router.get("/find/:characterId", characterCtrl.getCharacterById);

//GET CHACARTER EXTRA INFO BY ID
router.get("/find/extra/:characterId/:username", characterCtrl.getCharacterExtraById);


module.exports = router;