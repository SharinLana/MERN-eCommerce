require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./db_config/db");

const app = express();
mongoose.set("strictQuery", true);

// Port
const httpServer = createServer(app);
global.io = new Server(httpServer);
const port = process.env.PORT || 5001;

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Real time chat with Socket.io
const admins = []; // [{ id: socket.id, admin: "Admin" + Math.floor(Math.random() * 1000000000000) }] => [ { id: 'PIEcPOM5v7Wq_Q8gAAAG', admin: 'Admin764784898501' } ]
const activeChats = [];

function get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

io.on("connection", (socket) => {
  // Listening for the event emitted in HeaderComponent.js where adminName was calculated randomly
  socket.on("admin connected with server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
    // console.log(admins); // [ { id: '_3VrvCa4E0yp5AX0AAAG', admin: 'Admin1000000000000' } ]
  });

  // Listening for the event emitted in src/components/user/UserChatComponent.js
  socket.on("client sends message", (msg) => {
    // from here, start delivering the client's message to admin in HeaderComponent.js
    // socket.broadcast sends messages to all clients except for the sender
    if (admins.length === 0) {
      socket.emit("no admin", ""); // listen to this event in src/components/user/UserChatComponent.js
    } else {
      // select only one available admin and establish a connection between him and the client
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdminId;

      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins);
        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdminId = admin.id;
      }
      socket.broadcast
        .to(targetAdminId)
        .emit("server sends message from client to admin", {
          user: socket.id,
          message: msg,
        });
    }
  });

  socket.on("admin sends message", ({ user, msg }) => {
    socket.broadcast
      .to(user)
      .emit("server sends message from admin to client", {
        message: msg,
      });
    // client listens to this message in the frontend/src/components/user/UserChatComponent.js
  });

  socket.on("admin closes chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed chat", ""); // listen in UserChatComponent.js
    let c = io.sockets.sockets.get(socketId);
    c.disconnect(); // reason:  server namespace disconnect
  });

  socket.on("disconnect", (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1);
    }
    // activeChats = activeChats.filter((item) => item.adminId !== socket.id);

    // // client disconnected
    // const removeIndexClient = activeChats.findIndex(
    //   (item) => item.clientId === socket.id
    // );
    // if (removeIndexClient !== -1) {
    //   activeChats.splice(removeIndexClient, 1);
    // }
    // socket.broadcast.emit("disconnected", {
    //   reason: reason,
    //   socketId: socket.id,
    // });
  });
});

// Routes middleware
app.use("/api", apiRoutes);

// Error middleware
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

const start = async () => {
  try {
    connectDB();
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
