const express = require('express');
const router = express.Router();
let helper = require('../helpers/mail');



// Home page route
router.get('/', (req, res) => {
    res.send('Hello World')
})



// Send email route
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



// handling invalid routes
router.get('*', (req, res) => {
    res.status(404).send('Invalid route');
})



module.exports = router;