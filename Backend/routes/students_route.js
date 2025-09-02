const router = require('express').Router();
const Student = require('../models/student');
let student = require('../models/student');

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const Regno  = String(req.body.Regno);
  const email  = String(req.body.email);
  const phone  = String(req.body.phone);
  const gender = req.body.gender;

  const newStudent = new student({
    name,
    Regno,
    email,
    phone,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json('Student Added Successfully');
    })
    .catch((err) => console.log(err.message));
});

router.route('/get').get((req, res) => {
  student
    .find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => console.log(err.message));
});

router.route('/update/:sid').put(async (req, res) => {
  let userID = req.params.sid;
  const { name, Regno,email,phone, gender } = req.body;

  const updateStudent = {
    name,
    Regno,
    email,
    phone,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userID, updateStudent)
    .then(() => {
      res.status(200).send({
        status: 'User Updated',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Server Error with updating data',
        error: err.message,
      });
    });
});

router.route('/delete/:sid').delete(async (req, res) => {
  let uId = req.params.sid;
  await Student.findByIdAndDelete(uId)
    .then(() => {
      res.status(200).send({
        status: 'user Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting user',
        error: err.message,
      });
    });
});

router.route('/get/:sid').get(async (req, res) => {
  const uID = req.params.sid;
  const user = await Student.findById(uID)
    .then((user) => {
      res.status(200).send({
        status: 'User Fetched',
        user,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with fetch user',
        error: err.message,
      });
    });
});

module.exports = router;
