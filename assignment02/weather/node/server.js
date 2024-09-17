import express from "express";

const app = express();
const port = 3000;

const APPID = process.env.OPENWEATHERMAP_API_APPID;

app.get("/coords", async (req, res) => {
  const city = req.query.city ?? false;
  const state = req.query.state ?? false;

  if (!city || !state) {
    res.status(400).send("Bad request - Malformed content");
    return;
  }

  if (!/[a-z]{2}/i.test(state)) {
    res.status(400).send("Bad request - State code not parseable");
    return;
  }

  const q = `${city},${state},US`;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${APPID}`;

  fetch(url)
    .then((result) => result.json())
    .then((json) => {
      // API response is a _list_ of objects, so we grab the first one
      const { lat, lon } = json[0];
      const data = { latitude: lat, longitude: lon };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    });
});

app.listen(port, () => {
  if (typeof APPID === "undefined") {
    console.log(
      "Error: Server cannot be started. Required env var OPENWEATHERMAP_API_APPID is not defined.",
    );
    process.exit(1);
  } else {
    console.log(`Express is running on port ${port}...`);
  }
});
