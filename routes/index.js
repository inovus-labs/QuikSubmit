
const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./auth');

// Use routes
router.use('/auth', authRoutes);

let helper = require('../helpers/nodemailer');



function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}



// Home route
router.get('/', (req, res) => {
    res.render('index');
})



// Dashboard route
// router.get('/dashboard', isLoggedIn, (req, res) => {
//     res.render('dashboard', { 
//         user: req.user, 
//         layout: 'dashboard'
//     });
// })



// Send email to user
router.post('/send/:token', async (req, res) => {
    
    let token = req.params.token;
    let email = req.body.email;
    let subject = req.body.subject;
    let body = req.body.body;

    if(email && subject && body) {
        if(token == process.env.TOKEN) {

            await helper.sendEmailToUser(email, subject, body).then((result) => {
                res.status(200).send('Email sent');
            }).catch((error) => {
                res.status(500).send('Email not sent');
            });

        } else {
            res.status(403).send('Invalid token');
        }
    } else {
        res.status(400).send('Missing parameters');
    }

})



// 404 route
router.get('*', (req, res) => {
    res.render('404');
})



module.exports = router;