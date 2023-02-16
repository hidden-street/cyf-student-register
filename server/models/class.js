const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = require('./user');

const classSchema = mongoose.Schema({
name: { type: String, required: true, unique: true },
time: { type: String, required: true},
// date: { type: Date, required: true },
// try this way first
students: {type: String}
// students:[{
//     id: {type: String, required: true, unique: true},
//     date:{
//          type:Date,
//          default:Date.now,
//      },
// }]
}
// , {
// usePushEach: true
// }
);

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Class', classSchema)