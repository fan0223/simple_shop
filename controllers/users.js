const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { LocalStorage } = require('node-localstorage');

exports.signinForm = (req, res) => {
    res.render('signin', { error: '' });
};

exports.signin = async(req, res) => {
    try {
        var localStorage = new LocalStorage('./scratch');
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('signin', { error: 'loginE' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('signin', { error: 'loginP' });
        }

        console.log('successful login');

        const token = jwt.sign({ _id: user._id.toString() }, 'tokenSecret', {
            expiresIn: '2h',
        });

        localStorage.setItem('token', token);
        req.token = token;
        user.token = token;

        await user.save();
        res.redirect('/');
    } catch (error) {
        if (error) {
            console.log(error);
            res.redirect('/user');
        }
    }
};

exports.signup = async(req, res) => {
    try {
        var localStorage = new LocalStorage('./scratch');
        const email = req.body.email;
        const existUser = await User.findOne({ email: email });
        if (existUser) return res.render('signin', { error: 'email' });

        if (req.body.password2 !== req.body.password) {
            return res.render('signin', { error: 'password' });
        }

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log('success create new User.');

        const token = jwt.sign({ _id: newUser._id.toString() }, 'tokenSecret', {
            expiresIn: '2h',
        });
        localStorage.setItem('token', token);
        console.log(token);
        newUser.token = token;
        req.token = token;

        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/user');
    }
};