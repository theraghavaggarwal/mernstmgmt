const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGO_URI;  // use env variable instead of hardcoding

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});
const studentRoute = require("./routes/students_route");
app.use("/student", studentRoute);
module.exports.handler = serverless(app);
