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
  const str = input().split("");
  let zeroCnt = 0,
    oneCnt = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "0") zeroCnt++;
    else oneCnt++;
  }

  let cnt = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "1") continue;
    str[i] = "";
    cnt++;
    if (cnt === oneCnt / 2) break;
  }

  cnt = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== "0") continue;
    str[i] = "";
    cnt++;
    if (cnt === zeroCnt / 2) break;
  }

  return str.join("");
}
