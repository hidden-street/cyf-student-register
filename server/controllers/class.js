const Class = require('../models/class');

// sign into class
exports.classSignIn = (req, res, next) => {
	console.log('hello')
};

// getAllClasss
exports.getAllClasses = (req, res, next) => {
   Class.find()
   .then((classes) => {res.status(200).json(classes);
   })
   .catch((error) => {res.status(400).json({error: error,});
   });
}

// getOneClass
exports.getOneClass = (req, res, next) => {
	Class.findOne({_id: req.params.id})
	.then((found) => {res.send(200).json(found);
   })
   .catch((error) => {res.status(400).json({error: error,});
   });
	
}

// createClass
exports.createClass = (req, res, next) => {
	let newClass = new Class({
		classId: req.body.classId,
		name: req.body.name,
		time: req.body.time,
		date: req.body.date
	})
	newClass.save()
	.then(() =>{
		res.status(201).json({
			message: "class saved successfully",
		});
	})
	.catch((error) =>{
		res.status(400).json({
			error: error,
		})
	})
}

// delete a Class
exports.deleteClass = (req, res, next) => {
	Class.findOne({ _id: req.params.id })
	.then((found) => {
			Class.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({ message: `${found.name} has been deleted`});
				})
				.catch((error) => {
					res.status(400).json({ error: error,});
				});
		});
	};


// modify Class
exports.modifyClass = (req, res, next) => {
	console.log('modify class is working')
  }

