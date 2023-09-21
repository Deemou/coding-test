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
  const cards = input().split(" ").map(Number);
  const m = +input();
  const nums = input().split(" ").map(Number);
  const copy = nums.slice();
  const counts = new Map();
  cards.sort((a, b) => a - b);
  copy.sort((a, b) => a - b);

  for (let i = 0; i < m; i++) {
    counts.set(nums[i], 0);
  }

  let cardIdx = 0;
  let numIdx = 0;
  while (numIdx < m) {
    const card = cards[cardIdx];
    const num = copy[numIdx];
    if (card === num) {
      const cnt = counts.get(num);
      counts.set(num, cnt + 1);
      cardIdx++;
    } else if (card < num) {
      cardIdx++;
    } else {
      numIdx++;
    }
  }

  let answer = [];

  for (let i = 0; i < m; i++) {
    const cnt = counts.get(nums[i]);
    answer.push(cnt);
  }

  return answer.join(" ");
}
