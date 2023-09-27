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
  const [N, M] = input().split(" ").map(Number);
  const hears = [];
  const sees = [];
  const answer = [];

  for (let i = 0; i < N; i++) {
    hears.push(input());
  }
  for (let i = 0; i < M; i++) {
    sees.push(input());
  }
  hears.sort();
  sees.sort();

  let i = (j = 0);

  while (i < N && j < M) {
    const hear = hears[i];
    const see = sees[j];

    if (hear < see) {
      i++;
    } else if (hear > see) {
      j++;
    } else {
      answer.push(hear);
      i++;
      j++;
    }
  }
  return [answer.length, ...answer].join("\n");
}
