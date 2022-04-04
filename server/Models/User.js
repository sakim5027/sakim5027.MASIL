const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 6
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    firstName: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 1  //1 is normal user & 2 is admin
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

const User = mongoose.model('User', userSchema)

module.exports = { User }