import express from "express";

const router = express.Router();

router.get("/:a/:b", (req, res) => {
  const aStr = req.params.a ?? 0;
  const bStr = req.params.b ?? 0;

  const a = isNaN(parseInt(aStr)) ? 0 : parseInt(aStr);
  const b = isNaN(parseInt(bStr)) ? 0 : parseInt(bStr);

  res.status(200).send(JSON.stringify({ sum: a + b }));
});

export { router };
