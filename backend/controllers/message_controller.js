var Convo = require("../models/conversation");
var Message = require("../models/message_folders");
var UserModel = require("../models/User");
const { getReceiverSocketId, io } = require("../socket/socket");
async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    console.log(message);
    const { id: receiverId } = req.params;
    console.log(req.params.id);
    const senderId = req.user.id;
    console.log(senderId);
    let conversation = await Convo.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    console.log(conversation);
    if (!conversation) {
      conversation = await Convo.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({ senderId, receiverId, message });
    console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: "LLLL" });
  }
}
async function getMessages(req, res) {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    console.log(req.params.id);
    console.log(senderId);
    const conversation = await Convo.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    console.log(conversation);
    // if (conversation) {
    //   const populatedMessages = await Message.find({
    //     _id: { $in: conversation.messages },
    //   });
    //   conversation.populate("messages");
    // }
    if (!conversation) return res.status(400).json([]);
    const messages = conversation.messages;
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { sendMessage, getMessages };
