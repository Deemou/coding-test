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
  const scores = [];

  for (let i = 0; i < n; i++) {
    let [name, ...score] = input().split(" ");
    score = score.map(Number);
    scores.push([name, score]);
  }

  scores.sort((a, b) => {
    if (a[1][0] !== b[1][0]) {
      return b[1][0] - a[1][0];
    }
    if (a[1][1] !== b[1][1]) {
      return a[1][1] - b[1][1];
    }
    if (a[1][2] !== b[1][2]) {
      return b[1][2] - a[1][2];
    }
    if (a[0] <= b[0]) return -1;
    return 1;
  });

  return scores.map((v) => v[0]).join("\n");
}
