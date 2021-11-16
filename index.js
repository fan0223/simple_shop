const express = require('express')


const connectDB = require('./config/db')
const User = require('./models/User')


const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

connectDB()


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
    res.render('signup', { error: '' })
})
app.get('/createPost', (req, res) => {
    res.render('createPost')
})

// 註冊
app.post('/signup', async(req, res) => {
        try {
            const email = req.body.email
            const existUser = await User.findOne({ email: email })
            if (existUser) return res.render('signup', { error: 'email' })

            if (req.body.password2 !== req.body.password) {
                return res.render('signup', { error: 'password' })
            }

            await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            console.log('success create new User.')

            await User.generateAuthToken()
            res.redirect('/')
        } catch (error) {
            console.log(error)
            res.redirect('/signup')
        }

    })
    // 登入
app.post('/signin', (req, res) => {
    res.send('signin page')
})




app.listen(4000, (req, res) => {
    console.log('successful')
})