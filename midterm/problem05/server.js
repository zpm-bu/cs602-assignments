import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;

  if (startDate === undefined || endDate === undefined) {
    let msg = "Undefined dates";
    console.log(msg);
    res.send(`<p>${msg}</p>`);
  }

  try {
    startDate = new Date(startDate);
  } catch (err) {
    let msg = "startDate could not be converted to a date";
    console.log(msg);
    res.send(`<p>${msg}</p>`);
  }

  try {
    endDate = new Date(endDate);
  } catch (err) {
    let msg = "endDate could not be converted to a date";
    console.log(msg);
    res.send(`<p>${msg}</p>`);
  }

  const minStart = new Date("2020-01-01");
  const maxEnd = new Date("2030-12-31");

  const tenYears_ms = 31556952000;

  if (
    startDate > endDate ||
    startDate < minStart ||
    endDate > maxEnd ||
    endDate - startDate > tenYears_ms
  ) {
    let msg = "Illegal date params";
    console.log(msg);
    res.send(`<p>${msg}</p>`);
  }

  res.send("<p>OK, dates are good</p>");
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}...`);
});
