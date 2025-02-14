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
  const n = input();
  let num = 0;
  let ptr = 0;

  while (ptr < n.length) {
    num++;
    const str = String(num);

    for (let i = 0; i < str.length; i++) {
      if (ptr >= n.length) break;
      if (str[i] === n[ptr]) ptr++;
    }
  }

  return num;
}
