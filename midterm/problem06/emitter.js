import EventEmitter from "node:events";

const curses = ["fuck", "shit"];

const eventEmitter = new EventEmitter();

eventEmitter.on("message", (message) => {
  const words = message.split(" ");
  for (const curse of curses) {
    if (words.includes(curse)) {
      eventEmitter.emit("SWEAR_ENCOUNTERED");
    }
  }
});

eventEmitter.on("SWEAR_ENCOUNTERED", () => {
  console.log("No cursing please");
});

eventEmitter.emit("message", "Foo bar shit baz quux");
