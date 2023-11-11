require('dotenv').config()

const { engine } = require('express-handlebars');
const express = require('express')
const app = express()

var path = require('path');

const db = require('./config/db');
db.connect();

const routes = require('./routes')
app.use("/", routes);



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



app.listen(process.env.PORT, () => {
    console.log(`\n--- Server started on port ${process.env.PORT}`)
})