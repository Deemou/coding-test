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
  const S = input();
  const strings = S.split(".");

  for (let i = 0; i < strings.length; i++) {
    const string = strings[i];
    const len = string.length;
    if (!len) continue;
    if (len % 2 === 1) return -1;

    const q = Math.floor(len / 4);
    const r = len % 4;
    let newString = "AAAA".repeat(q);
    if (r) newString += "BB";
    strings[i] = newString;
  }

  return strings.join(".");
}
