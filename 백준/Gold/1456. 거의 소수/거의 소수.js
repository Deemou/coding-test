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
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const [a, b] = input().split(" ").map(Number);
  let cnt = 0;

  // 에라토스테네스의 체
  const max = Math.floor(Math.sqrt(b));
  let sieve = Array(max + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i <= max; i++) {
    if (!sieve[i]) continue;

    for (let j = i * i; j <= max; j += i) {
      sieve[j] = false;
    }
  }

  for (let i = 2; i <= max; i++) {
    if (!sieve[i]) continue;

    for (let primelike = i * i; primelike <= b; primelike *= i) {
      if (primelike >= a && primelike <= b) cnt++;
    }
  }

  return cnt;
}
