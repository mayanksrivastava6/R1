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

});

module.exports = mongoose.model("Registeruser", userSchema);
