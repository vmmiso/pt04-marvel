const router = require("express").Router();

const likeCtrl = require('../controllers/like.controller.js');


//ADD LIKE / UNLIKE
router.post("/", likeCtrl.addLike);

//GET LIKE BY ID
router.get("/find/:likeId", likeCtrl.getLikeById);



//GET LIKES BY CHARACTER
//router.get("/find/character/:characterId", likeCtrl.getLikesByCharacter);

//GET LIKES BY USER
// router.get("/find/:username", likeCtrl.getLikesByUserId);

//UPDATE LIKE
// router.put("/:likeId", likeCtrl.updateLike);

//DELETE LIKE
// router.delete("/:likeId", likeCtrl.deleteLike);



module.exports = router;