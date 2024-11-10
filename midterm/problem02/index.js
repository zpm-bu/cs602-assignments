import { writeFileSync } from "node:fs";

async function getResults() {
  console.log("Fetching results");
  const url = "https://jsonplaceholder.typicode.com/posts";

  const response = await fetch(url);
  const json = await response.json();

  return json;
}

const result = await getResults();

// Assume this is just going to be ok
const target = process.argv[2];
if (target === undefined || target === "") {
  throw new Error("Must provide target path to write file to");
}

try {
  writeFileSync(target, JSON.stringify(result));
  console.log(`Wrote to file '${target}'`);
} catch (err) {
  // No handling needed for just the midterm
  console.error(err);
}
