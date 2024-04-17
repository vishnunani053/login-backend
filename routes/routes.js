const express = require('express')
const signupController = require('../controllers/signupController/signupController');
const signInController = require('../controllers/SignIn/signinController');

const router = express.Router();

router.post('/signup',signupController)
router.post('/signin',signInController)


module.exports = router