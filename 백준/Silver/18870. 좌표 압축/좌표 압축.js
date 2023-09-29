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
  const n = +input();
  const nums = input().split(" ").map(Number);
  const map = new Map();
  const orderd = nums.slice().sort((a, b) => a - b);
  let cnt = 0;
  const answer = [];

  for (let i = 0; i < n; i++) {
    const cur = orderd[i];
    if (cur === orderd[i - 1]) continue;
    map.set(cur, cnt++);
  }

  for (let i = 0; i < n; i++) {
    const cur = nums[i];
    cnt = map.get(cur);
    answer.push(cnt);
  }

  return answer.join(" ");
}
