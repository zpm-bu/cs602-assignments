import chokidar from "chokidar";
import { processFileAndSaveTo } from "./src/convert.js";

const WATCH_PATH = "./inbox/";
const OPTS = {
  // Keep running after called, or run once?
  persistent: true,

  // Ignore files that are already in the watched path when the watcher starts?
  ignoreInitial: true,
};

const convert = processFileAndSaveTo("./processed/");

chokidar
  .watch(WATCH_PATH, OPTS)
  .on("ready", () =>
    console.log(`Chokidar watching for changes on ${WATCH_PATH}...`),
  )
  .on("add", (path) => console.log(`File ${path} added.`))
  .on("add", (path) => convert(path));
