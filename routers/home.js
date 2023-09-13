const express = require("express");
const homeSchema = require("../models/homeSchema");
const Router = express.Router();
const querystring = require("querystring");
const axios = require("axios");


const verifyCaptcha = async (req, res, next) => {
  const { "g-recaptcha-response": token } = req.body;
  const secretKey = "6Le_np0mAAAAANvpwFAN6nd9PBub3_3jrWRLbsrY";
  const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
  const postData = querystring.stringify({
    secret: secretKey,
    response: token,
  });
console.log('Helo');

  axios.post(verificationUrl, postData).then((response) => {
    const { success } = response.data;
    console.log('hello');
    
    if (success) {
      res.send("Signup successful!");
    } else {
      res.status(401).send("Verfication failed");
    }
  });
};

Router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      studentNumber,
      phone,
      hackerRankUsername,
      UnstopUsername,
      section,
      branch,
      year,
      gender,
      residence,
    } = req.body;

    const useremail = await homeSchema.findOne({
      email: email,
    });
    if (useremail) {
      console.log("User Already Exists");
      res.json({ success: false, msg: "User already exist" });
    } else {
      try {
        const userData = new homeSchema({
          username,
          email,
          studentNumber,
          phone,
          hackerRankUsername,
          UnstopUsername,
          section,
          branch,
          year,
          gender,
          residence,
        });
        await userData.save();
        res.json({ success: true, msg: "Registered Successfully" });
      } catch (err) {
        console.log(err);
        res.json({ succes: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;