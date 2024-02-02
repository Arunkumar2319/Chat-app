const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const server = http.createServer(app);

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {

    // General Chat 
    console.log(`Server users ${socket.id}`)

    socket.on("join_chat", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log(data);
        // socket.broadcast.emit("receive_message", data)
        socket.to(data.user).emit("receive_message", data)
    })
    

    // Video-Chat
    console.log(`User ${socket.id} connected`);

    // Handle joining the room
    socket.on('join', (callerId) => {
        console.log(`User ${socket.id} joined`);
        socket.join('room');

        // Notify all clients about the new user
        socket.broadcast.to('room').emit('call', callerId);
    });

    // Handle answering the call
    socket.on('answer', ({ callerId, stream }) => {
        console.log(`User ${socket.id} answered the call from ${callerId}`);

        // Send the caller's stream to the answering user
        io.to(callerId).emit('callerStream', stream);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        socket.leave('room');
    });
})

server.listen(8080, () => {
    console.log("Server Starts")
})