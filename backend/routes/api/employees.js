const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const Employee = require("../../models/Employee");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Employee.findOne({ email: req.body.email }).then(employee => {
      if (employee) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newEmployee = new Employee({
          name: req.body.name,
          email: req.body.email,
          position: req.body.position,
          password: req.body.password,
          phone_number: req.body.phone_number,
          address1: req.body.address1,
          address2: req.body.address2,
          emergency_contact: req.body.emergency_contact,
          start_date: req.body.start_date
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newEmployee.password, salt, (err, hash) => {
            if (err) throw err;
            newEmployee.password = hash;
            newEmployee
              .save()
              .then(employee => res.json(employee))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });



  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    Employee.findOne({ email }).then(employee => {
      // Check if user exists
      if (!employee) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, employee.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: employee.id,
            name: employee.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });




// @route PATCH api/employees/update
// @desc Update an existing employee
// @access Private
router.patch("/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let employeeFields = {};

    employeeFields.phone_number = req.body.phone_number;
    employeeFields.address1 = req.body.address1;
    employeeFields.address2 = req.body.address2;
    employeeFields.emergency_contact = req.body.emergency_contact;
    employeeFields.start_date = req.body.start_date;
   

    Employee.findOneAndUpdate(
      { _id: req.body.id },
      { $set: employeeFields },
      { new: true }
    )
      .then(employee => {
        res.json(employee);
      })
      .catch(err => console.log(err));
    }
);


router.get( "/:id", (req,res) => {

  if (mongoogse.Types.ObjectId.isValid(employeeId.id)) {
    Employee.findById(employee.id) 
      .then((res) => {
        console.log(res)
      })
  }


  } 
);


router.get('/', async (req, res) => {
  try {
    const employee = await Employee.find()
      res.json(employee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})





























  module.exports = router;