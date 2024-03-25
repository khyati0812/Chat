const mongoose = require("mongoose");
var UserModel = require("../models/User");
var messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
var Message = mongoose.model("Message", messageSchema);
module.exports = Message;
