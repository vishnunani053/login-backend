const express = require('express')
const signupController = require('../controllers/authController/signupController');
const signInController = require('../controllers/authController/signinController');

const router = express.Router();

router.post('/signup',signupController)
router.post('/signin',signInController)


module.exports = router