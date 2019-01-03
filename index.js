/*
 * d01mu
 * github.com/01mu
 */

const express = require('express');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

const db = require("./db");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/', function (req, res, next) {
    db.showBlogPosts(res);
});

