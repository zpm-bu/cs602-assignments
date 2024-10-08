import { WebSocket } from "ws";
import readline from "readline";

const PORT = 3000;
const client = new WebSocket(`ws://localhost:${PORT}/`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.on("error", console.error);

client.on("open", () => {
  console.log("Connection opened");

  rl.on("line", () => {
    console.log(">> Sending the message to the server...");
    client.send("Testing");
  });
});

client.on("message", (message) => {
  console.log(`Received ${message} from server`);
});
