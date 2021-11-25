const express = require('express');

const connectDB = require('./config/db');

const app = express();
connectDB();

const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(4000, (req, res) => {
    console.log('successful');
});