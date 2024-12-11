import express from "express";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

// Utilities
function validateAlpha(password) {
  let count = 0;
  const regexp = /[A-Z]/i;

  for (let i = 0; i < password.length; i++) {
    if (regexp.test(password[i])) {
      count++;
    }
  }

  if (count < 3) {
    return {
      evaluation_code: "3xC",
      evaluation_msg: "Your password value does not meet our guidelines.",
    };
  }
}

function validateLength(password) {
  if (password.length < 12) {
    return {
      evaluation_code: "4yU",
      evaluation_msg: "Your password value is not long enough.",
    };
  }
}

function validateNumbers(password) {
  let count = 0;
  const regexp = /[0-9]/i;

  for (let i = 0; i < password.length; i++) {
    if (regexp.test(password[i])) {
      count++;
    }
  }

  if (count < 3) {
    return {
      evaluation_code: "8jZ",
      evaluation_msg: "Your password value needs to have at least 3 numbers.",
    };
  }
}

// The server itself
app.post("/validate", (req, res) => {
  const { password: password } = req.body;

  if (!password) {
    return res.status(406).json({
      evaluation_code: "NO GOOD",
      evaluation_msg: "DIDN'T INCLUDE PASSWORD IN REQUEST",
    });
  }

  for (const validateSpecifically of [
    validateAlpha,
    validateLength,
    validateNumbers,
  ]) {
    const result = validateSpecifically(password);
    if (result !== undefined) {
      return res.status(406).json(result);
    }
  }

  res.status(200).json({
    evaluation_code: "a1",
    evaluation_msg: "Your password is acceptable.",
  });
});

app.listen(port, () => {
  console.log(`Express is running on port ${port}...`);
});
