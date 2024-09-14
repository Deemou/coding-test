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
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const N = Number(input());
  return countTriangles(N);
}
function countTriangles(matchsticks) {
  let totalTriangles = 0;

  for (let a = 1; a <= matchsticks / 3; a++) {
    for (let b = a; b <= (matchsticks - a) / 2; b++) {
      const c = matchsticks - a - b;
      if (a + b > c) totalTriangles++;
    }
  }

  return totalTriangles;
}
