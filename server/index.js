const express = require("express");
const app = express();
const http = require("http");
/*
Boventste 3 heb je nodig om onze server samen te bouwen met socket.io
*/
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //welke url/server(react server) een call doet naar de socket.io server
    methods: ["GET", "POST"],
  },
});

/* io.on();
initialiseer an detecteer of iemand verbonden is met de server 
luisteren of er een event is met een bepaalde id of naam.
*/

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
      socket.to(data.room).emit("recieve_message",data)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("[server running]");
});
