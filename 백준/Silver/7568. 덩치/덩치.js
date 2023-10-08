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
  const people = [];
  for (let i = 0; i < N; i++) {
    people.push(input().split(" ").map(Number));
  }
  const ranks = new Array(N).fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      if (people[i][0] < people[j][0] && people[i][1] < people[j][1]) {
        ranks[i]++;
      }
    }
  }

  return ranks.join(" ");
}
