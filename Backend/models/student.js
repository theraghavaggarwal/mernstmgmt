const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  Regno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  
  phone: {
    type: Number,
    required: true,
  },
  
  gender: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
