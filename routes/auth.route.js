const express = require('express');
const router = express.Router();

// Validation
const {
    validLogin,
    validRegister,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../client/src/helpers/valid')

// Load controllers
const {
    registerController,
    activationController
} = require('../controllers/auth.controller.js')
router.post('/register', validRegister, registerController)
router.post('/actiavtion', activationController)

module.exports = router