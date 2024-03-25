const UserModel = require("../models/User");
async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user.id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
}
module.exports = getUsersForSidebar;
