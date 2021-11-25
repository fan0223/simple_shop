const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

UserSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// UserSchema.methods.generateAuthToken = async function() {
//     const user = this;

//     const token = jwt.sign({ _id: user._id.toString() },
//         'tokenSecret', { expiresIn: '1 day' },
//         (err, token) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 user.tokens = token;
//             }
//         }
//     );
//     console.log(token);
//     console.log(user);
//     // return token;
// };

// UserSchema.statics.findByCredentials = async function(email, password) {

//     const user = await this.findOne({ email })

//     if (!user) { return res.render('signup', { error: 'login' }) }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) { return res.render('signup', { error: 'login' }) }

//     console.log('successful login')
//     res.redirect('/')
//         // return user
// }

module.exports = mongoose.model('User', UserSchema);