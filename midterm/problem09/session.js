import { express } from "express";
import session, { MemoryStore } from "express-session";

const app = express();
const port = 3000;

// We use `express-session` to create the session:
app.use(
  session({
    secret: "dontstealmydata",
    resave: false,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

// Since we don't have anything to DO with the server, just... Let it spin...
app.listen(port, () => {
  console.log(`Express is running on port ${port}...`);
});
