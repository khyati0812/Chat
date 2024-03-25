const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { app, server } = require("./socket/socket.js");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const router = require("./routes/auth_routes");
const messRouter = require("./routes/message_routes");
const userRouter = require("./routes/userRoutes");
const { restrictToLogin } = require("./middlewares/authcontrol");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
app.use(cookieParser());
const __variableOfChoice = path.resolve();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/NewCR")
  .then(() => {
    UserModel.createIndexes();
    console.log("Connected to mongoose");
  })
  .catch((error) => {
    console.log("Error");
  });

app.use(express.json());
// app.use(
//   express.static(
//     path.join(__variableOfChoice, "..", "/frontend/vite-project/dist")
//   )
// );

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(
//       __variableOfChoice,
//       "..",
//       "frontend",
//       "vite-project",
//       "dist",
//       "index.html"
//     )
//   );
// });

app.use(cors());

app.get("/", (req, res) => {
  return res.send("HOME PAGE");
});

app.get("/api/users/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/auth/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const objectId = new mongoose.Types.ObjectId(userID);
    const user = await UserModel.findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ fullName: user.fullName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/auth", router);
app.use("/api/messages", restrictToLogin, messRouter);
app.use("/api/users", restrictToLogin, userRouter);

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
