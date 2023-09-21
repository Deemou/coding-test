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
  const n = +input();
  const p = input().split(" ").map(Number);
  let totalTime = 0;

  p.sort((a, b) => a - b).reduce((sum, time) => {
    totalTime += sum + time;
    return sum + time;
  }, 0);

  return totalTime;
}
