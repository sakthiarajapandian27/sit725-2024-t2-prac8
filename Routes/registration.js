const express = require('express');
const router = express.Router();
const {createRegistration} = require('../Controllers/signupController');
const {createNewWalkerRegistration} = require('../Controllers/signUpControllerWalker');

router.post('/registerOwner', createRegistration);  
router.post('/registerWalker', createNewWalkerRegistration);
module.exports = router;
