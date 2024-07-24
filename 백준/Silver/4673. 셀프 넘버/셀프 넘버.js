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
  const LIMIT = 10000;
  const selfNumbers = generateSelfNumbers(LIMIT);
  selfNumbers.forEach((num) => {
    console.log(num);
  });
}

function generateSelfNumbers(limit) {
  const isGenerated = new Array(limit + 1).fill(false);

  for (let i = 1; i <= limit; i++) {
    let n = i;
    let sum = n;

    while (n > 0) {
      sum += n % 10;
      n = Math.floor(n / 10);
    }

    if (sum <= limit) {
      isGenerated[sum] = true;
    }
  }

  const selfNumbers = [];
  for (let i = 1; i <= limit; i++) {
    if (!isGenerated[i]) {
      selfNumbers.push(i);
    }
  }

  return selfNumbers;
}
