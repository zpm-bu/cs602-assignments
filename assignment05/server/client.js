import { WebSocket } from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PORT = 3000;
const client = new WebSocket(`ws://localhost:${PORT}`);

client.on("error", console.error);

client.on("open", () => {
  console.log("Connection opened");

  console.log("Choose a message to send:");
  console.log("  1) Watch DYO-X");
  console.log("  2) Stop watching DYO-X");
  console.log("  3) Sync a list");
  console.log("  4) Initialize with a list");

  rl.on("line", (input) => {
    switch (input) {
      case "1":
        client.send(JSON.stringify({ action: "WATCH", ticker: "DYO-X" }));
        break;
      case "2":
        client.send(JSON.stringify({ action: "STOP", ticker: "DYO-X" }));
        break;
      case "3":
        client.send(
          JSON.stringify({
            action: "SYNC",
            tickers: ["DYO-X", "DYI-X", "NYF-X"],
          }),
        );
        break;
      case "4":
        client.send(
          JSON.stringify({
            action: "INIT",
            tickers: ["DYO-X", "DYI-X", "NYF-X"],
          }),
        );
        break;
      default:
        break;
    }
  });
});

client.on("message", (message) => {
  console.log(`Received ${message} from server`);
});
