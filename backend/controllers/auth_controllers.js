const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { genToken } = require("../utils/genToken");
async function Signup(req, res) {
  const { fullName, userName, password, confirmPassword, gender } = req.body;
  console.log(req.body);
  if (password !== confirmPassword)
    return res.status(404).json({ error: "Passwords don't match!" });
  const user = await UserModel.findOne({ userName: userName });
  if (user) return res.status(404).json({ error: "User already exists" });
  const boyProf = "https://avatar.iran.liara.run/public/boy";
  const girlProf = "https://avatar.iran.liara.run/public/girl";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    fullName,
    userName,
    password: hashedPassword,
    gender,
    profilePic: gender === "male" ? boyProf : girlProf,
  });

  await newUser.save();
  return res.status(200).json({ newUser });
}
async function Login(req, res) {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect pswd" });
    }
    const token = genToken(user);
    console.log(token);
    res.cookie("jwt", token);
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}
async function Logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { Signup, Login, Logout };
