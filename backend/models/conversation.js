const mongoose = require("mongoose");
var Message = require("../models/message_folders");
var conversation = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamps: true }
);
var Convo = mongoose.model("conversation", conversation);
module.exports = Convo;
