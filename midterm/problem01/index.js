import { exit } from "node:process";

function isKeyword(str) {
  return str.startsWith("-");
}

function parseArgs(args) {
  let result = { values: {}, positionals: [] };
  while (args.length > 0) {
    /* Let's do this the dumb way:
     *  1. Shift the next argument off the args queue (shift MUTATES the structure)
     *  2. Check it: Is it a keyword?
     *  YES. OK, now we gotta check what is now the first element of the array,
     *       the arg directly following the one we just shifted.
     *    Is this value another keyword?
     *      YES. Then the first arg is just a boolean flag.
     *      NO. This is a value assigned to the arg we just shifted; shift it
     *          off and save it too.
     *  NO. It's a positioanl argument; throw it onto the list.
     */
    const nextArg = args.shift();
    if (isKeyword(nextArg)) {
      const potentialValue = args[0];
      if (isKeyword(potentialValue)) {
        result.values[nextArg] = true;
      } else {
        const valueForArg = args.shift();
        result.values[nextArg] = valueForArg;
      }
    } else {
      result.positionals.push(nextArg);
    }
  }
  return result;
}

const args = process.argv.slice(2);

const { values, positionals } = parseArgs(args);

console.log(`${JSON.stringify(values)}`);
