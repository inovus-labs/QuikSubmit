const express = require('express');
const router = express.Router();
let path = require('path');


// Get views path
let SignIn = path.join(__dirname, '../views/auth/signin.hbs');
let SignUp = path.join(__dirname, '../views/auth/signup.hbs');



// Sign up route
router.get('/signin', (req, res) => {
    res.render(SignIn);
})



// Sign up route
router.get('/signup', (req, res) => {
    res.render(SignUp);
})



module.exports = router;