import { WebSocket } from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const port = 3005;
const client = new WebSocket(`ws://localhost:${port}`);

client.on("error", console.error);

client.on("open", () => {
  console.log("connection opened");
  console.log("send a message:");

  rl.on("line", (input) => {
    console.log(input);
    client.send(input);
  });
});

client.on("message", (message) => {
  console.log("Received something:");
  console.log(message);
});
