import express from "express";
import fs from "node:fs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const assetsDir = "problem3/assets";

app.use(bodyParser.json());

app.get("/photos", async (_, res) => {
  console.log("Endpoint `photos/` received GET");
  // @ts-ignore:
  const contents = fs.readdirSync(assetsDir);
  res.json(contents);
});

app.post("/photos", async (req, res) => {
  console.log("Endpoint `photos/` received POST");
  const name = req.body.name;
  if (name === undefined) {
    res.send("");
    return;
  }
  res.contentType("image/jpeg");
  res.sendFile(`${assetsDir}/${name}`);
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}...`);
});
