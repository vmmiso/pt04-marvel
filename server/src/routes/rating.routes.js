const router = require("express").Router();

const ratingCtrl = require('../controllers/rating.controller.js');


//ADD RATING
router.post("/", ratingCtrl.addRating);

//GET RATING BY ID
router.get("/find/:ratingId", ratingCtrl.getRatingById);

//GET AVERAGE RATING BY CHARACTERID
router.get("/find/character/:characterId", ratingCtrl.averageRatingCharacter);

//GET RATING BY USER AND CHARACTERID
// router.get("/find/:username/:characterId", ratingCtrl.getRatingByUserCharacter);



//GET RATINGS BY USER
// router.get("/find/:username", ratingCtrl.getRatingByUserId);

//UPDATE RATING
// router.put("/:ratingId", ratingCtrl.updateRating);

//DELETE RATING
// router.delete("/:ratingId", ratingCtrl.addRating);



module.exports = router;