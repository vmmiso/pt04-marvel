const router = require("express").Router();

const authCtrl = require('../controllers/auth.controller.js');


//REGISTER
// router.post("/register", checkDuplicateUsernameOrEmail, authCtrl.register);

//LOGIN
router.post("/login", authCtrl.login);


module.exports = router;