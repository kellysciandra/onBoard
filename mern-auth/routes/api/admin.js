const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/adminRegister");
const validateLoginInput = require("../../validation/adminLogin");
// Load Admin model
const Admin = require("../../models/Admin");


// @route POST api/admin/adminRegister
// @desc Register admin
// @access Public
router.post("/adminRegister", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Admin.findOne({ email: req.body.email }).then(admin => {
      if (admin) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


  // @route POST api/admin/adminLogin
// @desc Login admin and return JWT token
// @access Public
router.post("/adminLogin", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find admin by email
    Admin.findOne({ email }).then(admin => {
      // Check if admin exists
      if (!admin) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: admin.id,
            email: admin.email
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


  module.exports = router;