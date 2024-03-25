const express = require("express");
const userRouter = express.Router();
const getUsersForSidebar = require("../controllers/userController");
userRouter.get("/", getUsersForSidebar);
module.exports = userRouter;
