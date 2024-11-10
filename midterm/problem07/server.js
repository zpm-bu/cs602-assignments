import { WebSocketServer } from "ws";
import ws from "ws";

const port = 4000;

const server = new WebSocketServer({ port: port });

server.on("connection", async function (instance) {
  instance.on("error", console.error);
  console.log("New connection");
});

setInterval(() => {
  const msg = "Smile and Have Great Day!!";
  const clients = server.clients;
  for (const client of clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
}, 1500);

console.log(`Web socket server is running on port ${port}...`);
