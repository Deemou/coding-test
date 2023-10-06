const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const n = +input();
  const map = new Map();
  let max = 0;
  let bestSellers = [];

  for (let i = 0; i < n; i++) {
    const book = input();
    const cnt = map.get(book) || 0;
    map.set(book, cnt + 1);
  }

  for (let [k, v] of map) {
    if (v > max) {
      bestSellers = [k];
      max = v;
    } else if (v === max) {
      bestSellers.push(k);
    }
  }
  bestSellers.sort();

  return bestSellers[0];
}
