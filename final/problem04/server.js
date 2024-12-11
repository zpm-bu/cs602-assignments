import express from "express";
import cors from "cors";
import { router as getSummation } from "./routes/getSummation.js";
import { router as getMultiplication } from "./routes/getMultiplication.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3004;

app.use(express.json());
app.use(cors());

app.use("/getSummation", getSummation);
app.use("/getMultiplication", getMultiplication);

app.listen(port, () => {
  console.log(`Express is running on port ${port}...`);
});
