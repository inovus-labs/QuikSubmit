require('dotenv').config()

const { engine } = require('express-handlebars');
const express = require('express')
const app = express()
const expressSession = require('express-session');

const path = require('path');

const cors = require('cors');
const passport = require('passport');
const passportSetup = require('./config/passport');

const db = require('./config/db');
db.connect();

const routes = require('./routes')
app.use("/", routes);



// ------------ Passport Config ------------

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax',
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());



// ------------ Express Config ------------

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// ------------ Template Engine Config ------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layout/',
    partialsDir: __dirname + '/views/partials'
}));



// ------------ Cors Config ------------

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
    })
);



app.listen(process.env.PORT, () => {
    console.log(`\n--- Server started on port ${process.env.PORT}`)
})