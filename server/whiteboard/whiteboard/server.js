const express = require("express")
const http = require('http')
const socket = require('socket.io')


const app = express()
const server = http.createServer(app)
const IO = socket(server)

app.use(express.static("public"));

IO.on("connection",(socket) => {
    console.log("a user connected:",socket.id);


    socket.on("draw",(data) => {
        socket.broadcast.emit("draw",data)

    });


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });


});

server.listen(4000,() => console.log("server started"))
