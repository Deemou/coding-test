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
  const numsA = input().split(" ").map(Number);
  const m = +input();
  const numsX = input().split(" ").map(Number);
  const answer = [];

  const map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(numsA[i], true);
  }
  for (let i = 0; i < m; i++) {
    let isExist = 0;
    if (map.has(numsX[i], true)) isExist = 1;
    answer.push(isExist);
  }

  return answer.join("\n");
}
