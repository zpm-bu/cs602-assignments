import { WebSocketServer } from "ws";

const PORT = 3000;
const server = new WebSocketServer({ port: PORT });

server.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (message) => {
    console.log(`Received message ${message} from client`);

    // Echo it back
    ws.send(message);
  });
});
