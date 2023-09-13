const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const home = require("./routers/home");
const mongoose = require("mongoose");

const app = express();

// middleware

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Screen");
});
mongoose
  .connect("mongodb+srv://atul:atul123@cluster0.bzldyvv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "You can't make any more requests at the moment. Try again later",
});
app.use(limiter);
app.use("/api", home);
