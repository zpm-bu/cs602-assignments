import { WebSocket } from "ws";

const port = 4000;

const client = new WebSocket(`ws://localhost:${port}`);

client.on("error", console.error);

client.on("open", () => {
  console.log("Connection opened");
});

client.on("message", (message) => {
  console.log(`Received ${message}`);
});
