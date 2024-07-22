const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const s = input();
  const n = s.length;
  const numOfA = s.split("").filter((char) => char === "a").length;

  let currentWindowBCount = 0;
  for (let i = 0; i < numOfA; i++) {
    if (s[i] === "b") currentWindowBCount++;
  }

  let minSwaps = currentWindowBCount;

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === "b") currentWindowBCount--;

    if (s[(i + numOfA) % n] === "b") currentWindowBCount++;

    minSwaps = Math.min(minSwaps, currentWindowBCount);
  }

  console.log(minSwaps);
}
