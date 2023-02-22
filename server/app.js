const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const helmet = require("helmet");
var dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(helmet());

const userRoutes = require('./routes/user');
const classRoutes = require("./routes/class");

app.use((req, res, next) => {
	res.removeHeader("Cross-Origin-Embedder-Policy");
	next();
});

mongoose
	.connect("mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + "/" + process.env.MONGO_DATABASE_NAME)
	.then(() => {
		console.log("Successfully connected to MongoDB Atlas!");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB Atlas!");
		console.error(error);
	});

app.use((req, res, next) => {

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});


mongoose.connect('mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE_NAME)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

/* const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
 */
  // Define a new route that retrieves data from the MongoDB database and returns it as a response.
app.get('/api/logs', async (req, res) => {
  try {
    const Log = mongoose.model('Log', {
      ID: String,
      loginTime: Date,
      logoutTime: Date,
    });
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// put routes here for now - I have already created user sign up and login look in controllers/ routes and middleware
// get users
const Student = mongoose.model('Student', {
  username: String,
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  cohort: String
});

// Define a new route that creates a new student document.
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student created', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a new route that retrieves all student documents and returns them as a response.
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get user by id
// Define a new route that retrieves a student document by ID and returns it as a response.
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get user by username
app.get('/api/students/username/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Define a new route that updates a student document by ID and returns it as a response.
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Define a new route that deletes a student document by ID.
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// create user

// create class
// get classes
// get class by DATE?
// update class
// delete class

app.use('/api/auth', userRoutes);

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/classes", classRoutes);

module.exports = app;
