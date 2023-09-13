const express = require("express");
const homeSchema = require("../models/homeSchema");
const Router = express.Router();
const querystring = require("querystring");
const axios = require("axios");

Router.get("/", async (req, res) => {
  try {
    return res.status(200).send("Welcome to Home Screen");
  } catch (error) {
    return res.status(400).send(err.message);
  }
});
const app = express();
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
// // Your registration endpoint
// app.post('/register', async (req, res) => {
//   const { recaptchaToken, ...otherData } = req.body;
//   const secretKey="6Le_np0mAAAAANvpwFAN6nd9PBub3_3jrWRLbsrY"
//   try {
//     // Verify reCAPTCHA on the server
//     const captchaResponse = await axios.post(
//       'https://www.google.com/recaptcha/api/siteverify',
//       `secret=${secretKey}&response=${recaptchaToken}`,
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     const captchaData = captchaResponse.data;

//     if (captchaData.success) {
//       try {
//         const {
//           username,
//           email,
//           studentNumber,
//           phone,
//           hackerRankUsername,
//           UnstopUsername,
//           section,
//           branch,
//           year,
//           gender,
//           residence,
//         } = req.body;
    
//         const useremail = await homeSchema.findOne({
//           email: email,
//         });
//         if (useremail) {
//           console.log("User Already Exists");
//           res.json({ success: false, msg: "User already exist" });
//         } else {
//           try {
//             const userData = new homeSchema({
//               username,
//               email,
//               studentNumber,
//               phone,
//               hackerRankUsername,
//               UnstopUsername,
//               section,
//               branch,
//               year,
//               gender,
//               residence,
//             });
//             await userData.save();
//             res.json({ success: true, msg: "Registered Successfully" });
//           } catch (err) {
//             console.log(err);
//             res.json({ succes: false });
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//       res.status(200).json({ message: 'Registration successful' });
//     } else {
//       // reCAPTCHA verification failed
//       res.status(400).json({ error: 'reCAPTCHA verification failed' });
//     }
//   } catch (error) {
//     // Handle any errors
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });