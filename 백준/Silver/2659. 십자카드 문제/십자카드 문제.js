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
  const target = input().split(" ").join("");
  const targetClockNum = getClockNum(target);

  let cnt = 0;
  for (let i = 1111; i <= Number(targetClockNum); i++) {
    if (isClockNumber(i)) cnt++;
  }

  return cnt;

  function getClockNum(num) {
    let min = Number(num);
    for (let i = 0; i < 4; i++) {
      const n = Number(num.slice(i) + num.slice(0, i));
      min = Math.min(min, n);
    }
    return min.toString();
  }

  function isClockNumber(n) {
    const s = n.toString();
    if (s.length !== 4 || s.includes("0")) return false;
    return getClockNum(s) === n.toString();
  }
}
