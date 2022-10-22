const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");


require("dotenv").config();


const app = express();
const server = http.createServer(app);
const io = socketio(server);





// Set static folder
app.use(express.static(path.join(__dirname, "public")));








const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`le serveur tourne sur le port: ${PORT}`));








