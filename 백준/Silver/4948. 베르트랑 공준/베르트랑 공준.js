const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
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
    solution();
    process.exit();
  });
}

function solution() {
  const answer = [];
  while (true) {
    const n = +input();
    if (n === 0) break;
    let cnt = 0;
    for (let i = n + 1; i <= 2 * n; i++) {
      if (isPrime(i)) cnt++;
    }
    answer.push(cnt);
  }
  console.log(answer.join("\n"));

  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}
