const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to mongoose'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
    console.log(process.env.DATABASE_URL, process.env.PORT);
})