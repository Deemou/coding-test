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
  const N = +input();
  const people = [];
  const ranks = [];

  for (let i = 0; i < N; i++) {
    const [x, y] = input().split(" ").map(Number);
    people.push([x, y]);
  }

  for (let i = 0; i < N; i++) {
    let rank = 1;

    for (let j = 0; j < N; j++) {
      if (people[i][0] < people[j][0] && people[i][1] < people[j][1]) rank++;
    }

    ranks.push(rank);
  }

  return ranks.join(" ");
}
