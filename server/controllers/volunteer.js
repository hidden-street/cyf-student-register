const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Volunteer = require('../models/volunteer');

const passwordValidator = require('password-validator');
let schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'password' , 'Password']); // Blacklist these values


exports.signup = (req, res, next) => {
  if(!schema.validate(req.body.password)){
    return res.status(401).json({
      error: new Error("Your password must be a minimum of 8 characters and include both upper and lowercase letters, no spaces and 2 digits"),
    });
  } else{
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
          const volunteer = new Volunteer({email: req.body.email,
          password: hash,
        });
      volunteer.save().then(
          () => {
              res.status(201).json({
                  message: 'Volunteer added successfully'
              })
          })
      .catch((error) => res.status(400).json({ error }))
      .catch((error) =>res.status(500).json({ error }))
      })
    }
  };

exports.login = (req, res, next) => {
    Volunteer.findOne({ email: req.body.email }).then(
    (volunteer) => {
        if (!volunteer) {
          return res.status(401).json({
            error: new Error('Volunteer not found!')
          });
          }
          bcrypt.compare(req.body.password, volunteer.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Incorrect password!')
                  });
                }
              const token = jwt.sign(
                { volunteerId: volunteer._id },
                process.env.TOKEN,
                { expiresIn: '24h' });
              res.status(200).json({
                volunteerId: volunteer._id,
                token: token
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }