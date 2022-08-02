const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
//Creacion del servidor xd
const socketio = require("socket.io");
const io = socketio(servidor,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }// aca se hace el mantenimiento de cors debido a socket.io 3
  });

io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en el chat`,
    }); // mostramos quien entro al chat
  });

  socket.on("mensaje", (nombre, mensaje) => {
    io.emit("mensajes", { nombre, mensaje });// mostramos el nombre con el mensaje
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado el chat`, // mostramos quien ha habandonado el chat
    });
  });
});

servidor.listen(5000, () => console.log("Server de Minecraft...")); // iniciacion del servidor
