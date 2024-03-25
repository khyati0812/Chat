// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const secret = process.env.SECRET;
// const UserModel = require("../models/User");
// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     console.log("where?",token);
//     if (!token) {
//       return res.status(404).json({ error: "unauthorised-no token provided" });
//     }
//     const decoded = jwt.verify(token, secret);
//     if (!decoded)
//           return res.status(404).json({ error: "Incorrect credentials" });
//       console.log(decoded.userID);
//     const user = await UserModel.findById(decoded.userID).select("-password");
//     if (!user) return res.status(404).json({ error: "Incorrect credentials" });
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("error encountered");
//     return res.status(500).json({ error: "internal server error" });
//   }
// };
// module.exports = protectRoute;
