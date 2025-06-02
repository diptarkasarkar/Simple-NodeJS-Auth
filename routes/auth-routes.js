const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth-controller');
const router = express.Router();

//All routs are related to user-auth
router.post('/register', registerUser);
router.post('/login', loginUser);





module.exports = router