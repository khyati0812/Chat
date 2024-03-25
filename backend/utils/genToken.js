require("dotenv").config();
const secret = process.env.SECRET;
console.log(secret);
const jwt = require("jsonwebtoken");
// const genToken = (userId, res) => {
//     const token = jwt.sign({ userId }, secret);
//   console.log("Hey from gen.js",token);
//   res.cookie("jwt", token);
// };
// module.exports = genToken;
function genToken(user)
{
    console.log(user._id);
    return jwt.sign({id:user._id}, secret);
}
function getToken(token)
{
    if (!token)
        return null;
    return jwt.verify(token, secret);
}
module.exports = { genToken,getToken };