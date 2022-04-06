const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const saltRounds = 10; //10 digits of salt will be created
const jwt = require('jsonwebtoken');

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


userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
    
                user.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});


userSchema.methods.comparePassword = function(plainPassword,callback){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);

        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function(callback){

    var user = this;

    //jsonwebtoken을 이용해서 token 생성
    var token = jwt.sign(user._id, 'secretToken') //user._id + 'secretToken' => token;  //token - 'secretToken' => user._id;

    user.token = token;
    user.save((err, user) => {
        if(err) return callback(err);

        callback(null, user);
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }