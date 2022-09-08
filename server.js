const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();

const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);


app.listen(process.env.PORT || 80, () => {
    console.log(`Server is running on port:${process.env.PORT}`);
    console.log("Connected to Database..");
})