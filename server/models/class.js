const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
// const user = require('./user');

const classSchema = mongoose.Schema({
classId: { type: Number, required: true},
name: { type: String, required: true },
time: { type: String, required: true},
date: { type: Date, required: true },
// try this way first
// students: [{type: String, required: false}]

});

// classSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Class', classSchema)