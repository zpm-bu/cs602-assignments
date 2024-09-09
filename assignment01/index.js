import { parseArgs } from "node:util";
import { exit } from "node:process";
import { conversion_lookup as convert } from "./src/conversion.js";

// Did you know that Node has this tool? So cool.
const { values: args, positionals: pos } = parseArgs({
  options: {
    from: {
      type: "string",
      short: "f",
    },
    to: {
      type: "string",
      short: "t",
    },
    negative: {
      type: "boolean",
      short: "n",
    },
  },
  strict: false,
  allowPositionals: true,
});

const sourceUnit = args.from ?? "F";
const targetUnit = args.to ?? "C";
const useNegative = args.negative ?? false;
let degrees = Number(pos[0]);

// Sanity check: Can we handle the value passed as `degrees`?
if (isNaN(degrees)) {
  console.log(
    `Value ${pos[0] ?? '""'} ` +
      "passed as `degrees`, but cannot be converted to a number.",
  );
  exit();
}
if (useNegative) {
  degrees = degrees * -1;
}

// Sanity check: Are the source and target degrees things we can handle?
const permittedUnits = ["F", "K", "C"];
if (!permittedUnits.includes(sourceUnit)) {
  console.log(
    `Unit "${sourceUnit}" is not supported. Please only use F, K, or C.`,
  );
  exit();
}

if (!permittedUnits.includes(targetUnit)) {
  console.log(
    `Unit "${targetUnit}" is not supported. Please only use F, K, or C.`,
  );
  exit();
}

const conversion_function = convert[sourceUnit][targetUnit];
console.log(
  `${degrees} degrees ${sourceUnit} is equal to ${
    conversion_function(degrees)
  } degrees ${targetUnit}`,
);
