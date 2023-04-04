const express = require('express');
const {register, login , forgetPassword, sendEmail} = require('../controllers/User');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);
router.post('/sendEmail', sendEmail);


module.exports = router;