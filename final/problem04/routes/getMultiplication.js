import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { a, b } = req.body;

  res.status(200).send({ mult: a * b });
});

export { router };
