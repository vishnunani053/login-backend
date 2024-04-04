const Router = require("express");
const signupController = require("../controllers/signupController/signupController");
const signinController = require("../controllers/SignIn/signinController");
const sendEmailController = require("../controllers/emailController/emailController");


const router = Router();
router.post("/signup",signupController)
router.post("/signin",signinController)
router.post('/send', sendEmailController)

module.exports = router;
