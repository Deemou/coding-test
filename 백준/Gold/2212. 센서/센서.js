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
  const N = +input();
  const K = +input();
  const sensors = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  if (K >= N) {
    return 0;
  } else {
    const distances = [];

    for (let i = 0; i < N - 1; i++) {
      distances[i] = sensors[i + 1] - sensors[i];
    }

    distances.sort((a, b) => a - b);

    for (let i = 0; i < K - 1; i++) {
      distances.pop();
    }
    
    return distances.reduce((a, b) => a + b);
  }
}
