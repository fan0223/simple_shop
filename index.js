const express = require('express')
const ejs = require('ejs')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})


app.listen(4000, (req, res) => {
    console.log('successful')
})