const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = require('./user');

const classSchema = mongoose.Schema({
name: { type: String, required: true, unique: true },
date: { type: Date, required: true },
students:[{
    id: {type: String, required: true, unique: true},
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

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Class', classSchema)