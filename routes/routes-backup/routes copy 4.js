const Router = require("express");
const signupController = require("../../controllers/signupController/signupController");
const signinController = require("../../controllers/SignIn/signinController");
const sendEmailController = require("../../controllers/emailController/emailController");
const updateUser = require("../../controllers/usersForm/updateUser");
const showUsers = require("../../controllers/usersForm/showUsers");
const addUserData = require("../../controllers/usersForm/addUserData");
const deleteUsers = require("../../controllers/usersForm/deleteUsers");


const router = Router();
router.get("/users",showUsers)
router.post("/signup",signupController)
router.post("/signin",signinController)
router.post('/send', sendEmailController)
router.post("/adduser",addUserData)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUsers)
module.exports = router;
