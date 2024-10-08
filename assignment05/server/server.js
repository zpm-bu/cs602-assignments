import { WebSocketServer } from "ws";

// Variables and constants ====================================================

const { FASTTRACK_APPID, FASTTRACK_ACCOUNT_ID, FASTTRACK_PASSWORD, PORT } =
  process.env;

/* Quickly validate that these are all good to go */
const PROCESS_VARS = [
  FASTTRACK_ACCOUNT_ID,
  FASTTRACK_APPID,
  FASTTRACK_PASSWORD,
  PORT,
];
if (PROCESS_VARS.some((element) => element === undefined)) {
  throw new Error(
    "MisconfiguredEnvError: At least one mandory environment variable is " +
      "undefined.",
  );
}

/* Some awful global state */
let TOKEN = "";
let PERMITTED = [];
let WATCHING = {};

// API interactions -----------------------------------------------------------

async function getFasttrackAPIToken() {
  console.log(">> Fetching auth token from Fasttrack");
  const url = `https://ftl.fasttrack.net/v1/auth/login?account=${FASTTRACK_ACCOUNT_ID}&pass=${FASTTRACK_PASSWORD}&appid=${FASTTRACK_APPID}`;

  const response = await fetch(url);
  const json = await response.json();

  if (json.token === undefined) {
    throw new Error(
      "BadFasttrackTokenError: Fasttrack token fetch failed, " +
        "no Fasttrack data can be accessed.",
    );
  }

  return json.token;
}

async function getFasttrackPermittedTickers() {
  console.log(">> Fetching list of permitted tickers");
  const url = `https://ftlightning.fasttrack.net/v1/family/All%20Indexes?appid=${FASTTRACK_APPID}&token=${TOKEN}`;

  const response = await fetch(url);
  const json = await response.json();

  if (json.tickers === undefined) {
    throw new Error(
      "NoTickersError: Fasttrack API did not respond with list of acceptable" +
        "tickers.",
    );
  }

  const tickers = json.tickers.split(",");
  return tickers;
}

function validate(ticker) {
  if (ticker === undefined) {
    console.log("Ticker is undefined");
    return false;
  }

  if (!PERMITTED.includes(ticker)) {
    console.log("Ticker not in permitted list");
    return false;
  }

  return true;
}

async function getFasttrackData() {
  const url = `https://ftl.fasttrack.net/v1/stats/xmulti`;
  const options = {
    method: "post",
    body: '["DYO-X", "DYI-X"]',
    headers: {
      "Content-Type": "application/json",
      appid: FASTTRACK_APPID,
      token: TOKEN,
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}

// Server =====================================================================

const server = new WebSocketServer({ port: PORT });

async function dispatch(socket, data) {
  const action = data.action;
  switch (action) {
    case "WATCH":
      if (validate(data.ticker)) {
        console.log(`WATCH request for ${data.ticker}`);
        WATCHING[data.ticker] = true;
        const confirmation = {
          success: true,
          type: "WATCHLIST",
          watching: Object.keys(WATCHING),
        };
        socket.send(JSON.stringify(confirmation));
      }
      break;

    case "STOP":
      if (data.ticker !== undefined) {
        console.log(`STOP request for ${data.ticker}`);
        delete WATCHING[data.ticker];
        const confirmation = {
          success: true,
          type: "WATCHLIST",
          watching: Object.keys(WATCHING),
        };
        socket.send(JSON.stringify(confirmation));
      }
      break;

    case "SYNCHRONIZE":
    case "SYNCH":
    case "SYNC":
      if (Array.isArray(data.tickers)) {
        console.log(`SYNC request for tickers ${data.tickers.slice(0, 4)}...`);

        for (const ticker of data.tickers) {
          if (validate(ticker)) {
            WATCHING[ticker] = true;
          }
        }

        const confirmation = {
          success: true,
          type: "WATCHLIST",
          watching: Object.keys(WATCHING),
        };
        socket.send(JSON.stringify(confirmation));
      }
      break;

    case "INITIALIZE":
    case "INIT":
      if (Array.isArray(data.tickers)) {
        for (const ticker of data.tickers) {
          if (validate(ticker)) {
            WATCHING[ticker] = true;
          }
        }

        const results = await getFasttrackData();
        let confirmation = {};
        if (!results.err) {
          confirmation = {
            success: true,
            type: "INIT",
            stats: results.statslist,
          };
        } else {
          confirmation = {
            success: false,
            type: "INIT",
          };
        }
        socket.send(JSON.stringify(confirmation));
      }

      break;

    default:
      break;
  }
}

server.on("connection", async function (ws) {
  ws.on("error", console.error);

  TOKEN = await getFasttrackAPIToken();
  console.log(`>> Token is ${TOKEN}`);
  PERMITTED = await getFasttrackPermittedTickers();
  console.log(`>> Permitted tickers are ${PERMITTED.slice(0, 4)}`);

  ws.on("message", (message) => {
    //try {
    const data = JSON.parse(message);
    dispatch(ws, data);
    //} catch (SyntaxError) {
    //  // If the message can't be parsed as JSON, we just do nothing.
    //  // No need to build robust failures in this homework assignment.
    //}
  });
});
