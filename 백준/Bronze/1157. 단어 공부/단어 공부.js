const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

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

readFile(filePath);

function solution() {
  const str = input().toUpperCase();
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const cnt = (map.get(char) || 0) + 1;
    map.set(char, cnt);
  }
  let ans = [];
  let maxCnt = 1;
  map.forEach((val, key) => {
    if (maxCnt === val) ans.push(key);
    if (maxCnt < val) {
      maxCnt = val;
      ans = [key];
    }
  });
  return ans.length === 1 ? ans[0] : "?";
}
