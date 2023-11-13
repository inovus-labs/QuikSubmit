const express = require('express');
const router = express.Router();
const passport = require('passport');
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



router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed'
}))



router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))



router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'User failed to authenticate.'
    });
});



router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'User has successfully authenticated.',
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'User failed to authenticate.'
        });
    }
});



router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});











module.exports = router;