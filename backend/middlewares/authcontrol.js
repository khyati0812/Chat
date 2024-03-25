const jwt = require("jsonwebtoken");
const { getToken } = require("../utils/genToken");
async function restrictToLogin(req, res, next) {
  console.log("is user logged in?", req.cookies);
  console.log("wtf");
  const token = req.cookies?.jwt;
  if (!token) return res.status(404).json({ error: "Incorrect cred" });
  const user = getToken(token);
  console.log("user", user);
  if (!user) return res.status(404).json({ error: "Incorrect cred" });
  req.user = user;
  next();
}
module.exports = { restrictToLogin };
