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
  let T = +input();
  const buttons = [300, 60, 10];
  const answer = [];

  for (let i = 0; i < buttons.length; i++) {
    answer.push(Math.floor(T / buttons[i]));
    T %= buttons[i];
  }

  return T === 0 ? answer.join(" ") : -1;
}
