const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Employee Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  emergency_contact: {
    type: String,
    required: true
  },
});
module.exports = Employee = mongoose.model("employees", EmployeeSchema);