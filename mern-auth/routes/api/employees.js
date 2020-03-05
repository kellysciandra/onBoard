const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/employeeRegister");
const validateLoginInput = require("../../validation/employeeLogin");
// Load Employee model
const Employees = require("../../models/Employees");


// @route POST api/employees/employeeRegister
// @desc Register employee
// @access Public
router.post("/employeeRegister", (req, res) => {
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
          password: req.body.password,
          position: req.body.position,
          address1: req.body.address1,
          address2: req.body.address2,
          phone_number: req.body.phone_number,
          emergency_contact: req.body.emergency_contact
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
module.exports = router;


//   // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });