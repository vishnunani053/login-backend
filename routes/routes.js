const Router = require("express");
const signupController = require("../controllers/signupController/signupController");
const signinController = require("../controllers/SignIn/signinController");


const router = Router();
router.post("/signup",signupController)
router.post("/signin",signinController)

module.exports = router;
