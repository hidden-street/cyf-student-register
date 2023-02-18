const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const classSchema = mongoose.Schema({
	classId: {type: Number, required: true},
	name: {type: String, required: true},
	time: {type: String, required: true},
	date: {type: Date, required: true},
	students: [{}],
});

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Class", classSchema);
