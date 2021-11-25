const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { LocalStorage } = require('node-localstorage');
module.exports = async(req, res, next) => {
    try {
        var localStorage = new LocalStorage('./scratch');
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            res.redirect('/');
        }
        const decoded = jwt.verify(token, 'tokenSecret');

        const user = await User.findOne({ _id: decoded._id, token: token });

        if (user) {
            next();
        } else {
            res.redirect('/user');
        }
    } catch (err) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
    }
};