const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose=require("mongoose")
mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB: ", err);
});
const managepost=require("./routes/managepost")
const loginRoute = require("./routes/loginroute");
const otpverification = require("./routes/otproute");
const UserProfile = require("./routes/profile");
const signupRoute = require("./routes/signuproute");
const postCreationRoute = require("./routes/postcreation");
const multer = require("multer");
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));
app.set("trust proxy",1);
app.use(express.static('multer'));
app.use("/multer",express.static("multer"))
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/postcreation", postCreationRoute);
app.use("/userprofile", UserProfile);
app.use("/managepost",managepost)
app.use("/verify-otp",otpverification)
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
