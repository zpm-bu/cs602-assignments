import { WebSocket, WebSocketServer } from "ws";

const port = 3005;

const server = new WebSocketServer({ port: port });

server.on("connection", async (socket) => {
  socket.on("error", console.error);

  console.log("Client connected.");

  socket.on("message", (message, isBinary) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString(), { binary: isBinary });
      }
    });
  });
});
