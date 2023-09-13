const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    default: "0000000000",
  },

  hackerRankUsername: {
    type: String,
    required: true,
  },
  UnstopUsername: {
    type: String,
    required: true,
  },

  section: {
    type: String,
    required: true,
    enum: ["1", "2", "3"],
  },
  year: {
    type: String,
    enum: ["2nd Year"],
  },
  branch: {
    type: String,
    enum: [
      "CSE",
      "CS",
      "CSE(AIML)",
      "CSE(DS)",
      "CSE(Hindi)",
      "CSIT",
      "IT",
      "ECE",
      "Electrical",
      "AIML",
      "Mechincal",
      "Civil",
    ],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  residence: {
    type: String,
    enum: ["Hosteller", "Day Scholar"],
  },
});

module.exports = mongoose.model("Registeruser", userSchema);
