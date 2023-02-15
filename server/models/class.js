const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = require('./user');

const userSchema = mongoose.Schema({
name: { type: String, required: true, unique: true },
date: { type: Date, required: true },
students:[{
    id: user.id,
    date:{
         type:Date,
         default:Date.now,
     },
     entry:{type:Date},

}]
}, {
usePushEach: true
}
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)