import express from "express";
import session, { MemoryStore } from "express-session";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors);
app.use(
  session({
    secret: "dontstealmydata",
    resave: false,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

const APPID = process.env.OPENWEATHERMAP_API_APPID;

app.use((req, _res, next) => {
  if (!req.session.reports) {
    req.session.reports = [];
  }
  next();
});

app.use((req, _, next) => {
  console.log(req.session);
  next();
});

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
    .catch((_) => {
      res.status(400).send("Oopsie");
      return;
    })
    .then((json) => {
      // API response is a _list_ of objects, so we grab the first one
      const { lat, lon } = json[0];
      const data = { latitude: lat, longitude: lon };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    });
});

app.get("/report", async (req, res) => {
  const city = req.query.city ?? "";
  const state = req.query.state ?? "";
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const label = `${city} ${state}`;

  if (typeof latitude === "undefined" || typeof longitude == "undefined") {
    res.status(400).send("Bad request - Malformed url");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APPID}`;

  fetch(url)
    .then((response) => response.json())
    .catch((_) => {
      res.status(400).send("Oopsie");
      return;
    })
    .then((json) => {
      const name = label;
      const latitude = json.coord.lat;
      const longitude = json.coord.lon;

      const main = json.main ?? {};
      const wind = json.wind ?? {};
      const weather = json.weather ?? {};

      const temperature = main.temp;
      const icon = weather.icon;
      const humidity = main.humidity;
      const windSpeed = wind.speed;

      const report = {
        name: name,
        latitude: latitude,
        longitude: longitude,
        temperature: temperature,
        icon: icon,
        humidity: humidity,
        windSpeed: windSpeed,
      };

      req.session.reports.unshift(report);

      res.send(JSON.stringify(report));
    });
});

app.get("/all-reports", async (req, res) => {
  //res.json(req.session.reports);
  const reports = req.session.reports;
  res.send(JSON.stringify({ reports: reports }));
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
