const loginController = require('../Controllers/logincontroller');
const express = require('express');
const router = express.Router();



router.post('/login',loginController);

module.exports = router;