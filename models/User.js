const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


UserSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'tokenSecret')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    // return token
}

module.exports = mongoose.model('User', UserSchema)