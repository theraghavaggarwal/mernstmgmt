const router = require("express").Router();
const Student = require("../models/student");

// Add Student
router.post("/add", async (req, res) => {
  try {
    const { name, Regno, email, phone, gender } = req.body;
    const newStudent = new Student({ name, Regno, email, phone, gender });
    await newStudent.save();
    res.status(201).json({ status: "Student Added Successfully" });
  } catch (err) {
    res.status(500).json({ status: "Error adding student", error: err.message });
  }
});

// Get all students
router.get("/get", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ status: "Error fetching students", error: err.message });
  }
});

// Get one student by ID
router.get("/get/:sid", async (req, res) => {
  try {
    const student = await Student.findById(req.params.sid);
    if (!student) return res.status(404).json({ status: "Student not found" });
    res.status(200).json({ status: "User Fetched", student });
  } catch (err) {
    res.status(500).json({ status: "Error fetching student", error: err.message });
  }
});

// Update student
router.put("/update/:sid", async (req, res) => {
  try {
    const { name, Regno, email, phone, gender } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.sid,
      { name, Regno, email, phone, gender },
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ status: "Student not found" });
    res.status(200).json({ status: "User Updated", updatedStudent });
  } catch (err) {
    res.status(500).json({ status: "Error updating student", error: err.message });
  }
});

// Delete student
router.delete("/delete/:sid", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.sid);
    if (!deletedStudent)
      return res.status(404).json({ status: "Student not found" });
    res.status(200).json({ status: "User Deleted" });
  } catch (err) {
    res.status(500).json({ status: "Error deleting student", error: err.message });
  }
});

module.exports = router;
