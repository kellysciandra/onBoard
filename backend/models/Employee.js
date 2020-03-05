const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  address1: {
    type: String,
    required: false
  },
  address2: {
    type: String,
    required: false
  },
  start_date: {
    type: String,
    required: false
  },
  emergency_contact: {
    type: String,
    required: false
  },
});
module.exports = Employee = mongoose.model("employees", EmployeeSchema);