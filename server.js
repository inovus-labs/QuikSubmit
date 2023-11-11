require('dotenv').config()

const express = require('express')
const app = express()

const db = require('./config/db');
db.connect();

const routes = require('./routes')
app.use(routes)



app.listen(process.env.PORT, () => {
    console.log(`\n--- Server started on port ${process.env.PORT}`)
})