const express = require("express");
const messRouter = express.Router();
const protectRoute = require("../middlewares/protectRoute");
const { restrictToLogin } = require("../middlewares/authcontrol");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message_controller");
messRouter.post("/send/:id", sendMessage);
messRouter.get("/:id", getMessages);
module.exports = messRouter;
