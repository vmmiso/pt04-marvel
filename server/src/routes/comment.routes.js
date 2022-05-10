const router = require("express").Router();

const commentCtrl = require('../controllers/comment.controller.js');


//ADD COMMENT
router.post("/", commentCtrl.addComment);

//GET COMMENT BY ID
router.get("/find/:commentId", commentCtrl.getCommentById);

//GET COMMENTS BY CHARACTER
router.get("/find/character/:characterId", commentCtrl.getCommentsByCharacter);



//GET COMMENTS BY USER
// router.get("/find/:username", commentCtrl.getCommentsByUserId);

//UPDATE COMMENT
// router.put("/:commentId", commentCtrl.updateComment);

//DELETE COMMENT
// router.delete("/:commentId", commentCtrl.deleteComment);



module.exports = router;