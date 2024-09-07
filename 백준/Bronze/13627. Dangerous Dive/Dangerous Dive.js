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
  const [N, R] = input().split(" ").map(Number);
  const returned = new Set(input().split(" ").map(Number));
  const notReturned = Array.from({ length: N }, (_, idx) => idx + 1).filter(
    (v) => !returned.has(v)
  );

  return notReturned.length === 0 ? "*" : notReturned.join(" ") + " ";
}
